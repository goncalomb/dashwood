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
        var el = document.createElement(tag);
        if (clazz) {
            el.className = clazz;
        }
        parent.appendChild(el);
        return el;
    }

    // samaritan.Marquee

    samaritan.Marquee = function(element) {
        this._el = dashwood.getElement(element);
        this._el.classList.add("dashwood-s-marquee");
        this._elText = dashwood.createElement("div", this._el, "text");
        this._elLine = dashwood.createElement("div", this._el, "line");
        this._elArrow = dashwood.createElement("div", this._el, "arrow arrow-animation");
        this._timeout = 0;
        this.waiting();
    }

    samaritan.Marquee.prototype._setMode = function(mode) {
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

    samaritan.Marquee.prototype._resizeUnderline = function(off) {
        var w = parseFloat(window.getComputedStyle(this._elText).width);
        this._elLine.style.width = (w + off) + "px";
    }

    samaritan.Marquee.prototype.clear = function() {
        this._setMode(null);
        if (this._elText.innerText == "-") {
            this._elText.innerText = "";
        } else {
            this._timeout = setTimeout(() => {
                this._elText.innerText = "";
            }, 200);
        }
    }

    samaritan.Marquee.prototype.banner = function(value) {
        if (!value) return this.clear();
        this._setMode("banner");
        this._elText.innerText = value;
    }

    samaritan.Marquee.prototype.animate = function(text, staticEnd) {
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

    samaritan.Marquee.prototype.waiting = function(text) {
        this._setMode("text");
        this._elText.innerText = "-";
        this._elText.style.opacity = "0";
        this._elLine.style.width = "";
        this._elArrow.classList.add("arrow-animation");
    }

    samaritan.Marquee.prototype.static = function(value) {
        if (!value) return this.clear();
        this._setMode("text");
        this._elText.innerText = value;
        this._resizeUnderline(80);
        this._elArrow.classList.remove("arrow-animation");
    }

    // samaritan.Progress

    samaritan.Progress = function(element, header) {
        this._el = dashwood.getElement(element);
        this._el.classList.add("dashwood-s-progress");
        this._elHeader = dashwood.createElement("div", this._el, "header");
        this._elHeader.innerText = header || "Loading";
        this._elInfo = dashwood.createElement("div", this._el, "info");
        this._elBar = dashwood.createElement("div", this._el, "bar");
        this._elBarInside = dashwood.createElement("div", this._elBar, "bar-inside");
        this.progress(0);
    };

    samaritan.Progress.prototype.header = function(text) {
        this._elHeader.innerText = text;
    }

    samaritan.Progress.prototype.info = function(text) {
        if (text) {
            this._elInfo.style.display = "block";
            this._elInfo.innerText = text;
        } else {
            this._elInfo.style.display = "";
            this._elInfo.innerText = "";
        }
    }

    samaritan.Progress.prototype.progress = function(value) {
        this._elBarInside.style.width = (value*100) + "%";
    }

})();
