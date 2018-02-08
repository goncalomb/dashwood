(function() {

    var dashwood = window.dashwood = {};
    var themachine = dashwood.themachine = { admin: "finch" };
    var samaritan = dashwood.samaritan = {};

    dashwood.getElement = function(value) {
        if (value instanceof HTMLElement) {
            return value;
        }
        return document.getElementById(value);
    }

    dashwood.createElement = function(tag, parent, clazz) {
        var el = document.createElement("div");
        if (clazz) {
            el.className = clazz;
        }
        parent.appendChild(el);
        return el;
    }

    // samaritan.marquee

    samaritan.marquee = function(element) {
        this._el = dashwood.getElement(element);
        this._el.classList.add("dashwood-s-marquee");
        this._elText = dashwood.createElement("div", this._el, "text");
        this._elLine = dashwood.createElement("div", this._el, "line");
        this._elArrow = dashwood.createElement("div", this._el, "arrow arrow-animation");
        this._timeout = 0;
        this.waiting();
    }

    samaritan.marquee.prototype._setMode = function(mode) {
        clearTimeout(this._timeout);
        this._elText.style.opacity = "";
        if (mode == "banner") {
            this._el.classList.add("mode-banner");
        } else {
            this._el.classList.remove("mode-banner");
        }
        if (mode == "text") {
            this._el.classList.add("mode-text");
        } else {
            this._el.classList.remove("mode-text");
            this._elLine.style.width = "";
        }
    }

    samaritan.marquee.prototype._resizeUnderline = function(off) {
        var w = parseFloat(window.getComputedStyle(this._elText).width);
        this._elLine.style.width = (w + off) + "px";
    }

    samaritan.marquee.prototype.clear = function() {
        this._setMode(null);
        if (this._elText.innerText == "-") {
            this._elText.innerText = "";
        } else {
            this._timeout = setTimeout(() => {
                this._elText.innerText = "";
            }, 200);
        }
    }

    samaritan.marquee.prototype.banner = function(value) {
        if (!value) return this.clear();
        this._setMode("banner");
        this._elText.innerText = value;
    }

    samaritan.marquee.prototype.animate = function(text, staticEnd) {
        if (!text) return this.clear();
        this._setMode("text");
        this._elArrow.classList.remove("arrow-animation");
        var parts = text.trim().replace(/\s+/g, " ").split(" ");
        var i = 0;
        var loop0 = () => {
            this._elText.style.opacity = "0";
            this._elText.innerText = parts[i];
            this._resizeUnderline(10);
            this._timeout = setTimeout(loop1, 100);
        };
        var loop1 = () => {
            this._elText.style.opacity = "";
            if (++i < parts.length) {
                this._timeout = setTimeout(loop0, 400);
            } else if (staticEnd) {
                this._timeout = setTimeout(() => {
                    this._elArrow.classList.add("arrow-animation");
                }, 100);
            } else {
                this._timeout = setTimeout(() => {
                    this.waiting();
                }, 400);
            }
        };
        this._timeout = setTimeout(loop0);
    }

    samaritan.marquee.prototype.waiting = function(text) {
        this._setMode("text");
        this._elText.innerText = "-";
        this._elText.style.opacity = "0";
        this._elLine.style.width = "";
        this._elArrow.classList.add("arrow-animation");
    }

    samaritan.marquee.prototype.static = function(value) {
        if (!value) return this.clear();
        this._setMode("text");
        this._elText.innerText = value;
        this._resizeUnderline(80);
        this._elArrow.classList.remove("arrow-animation");
    }

})();
