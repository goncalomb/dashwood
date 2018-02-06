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
        this._elLine.style.width = "25px";
    }

    samaritan.marquee.prototype.clear = function() {
        this._el.classList.remove("mode-banner", "mode-text");
        this._elLine.style.width = "25px";
        setTimeout(() => {
            this._elText.innerText = "";
        }, 200);
    }

    samaritan.marquee.prototype.banner = function(value) {
        if (!value) return this.clear();
        // disable text mode
        this._el.classList.remove("mode-text");
        this._elLine.style.width = "25px";
        // enable banner mode
        this._el.classList.add("mode-banner");
        this._elText.innerText = value;
    }

    samaritan.marquee.prototype.animate = function(value) {
        if (!value) return this.clear();
    }

    samaritan.marquee.prototype.static = function(value) {
        if (!value) return this.clear();
        // disable banner mode
        this._el.classList.remove("mode-banner");
        // enable text mode
        this._el.classList.add("mode-text");
        this._elText.innerText = value;
        // set line size
        var w = parseFloat(window.getComputedStyle(this._elText).width);
        this._elLine.style.width = w + 80 + "px";
    }

})();
