(function() {

    var dashwood = window.dashwood = {};

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

    dashwood.DemoControls = function(element) {
        this._el = dashwood.getElement(element);
        this._elTable = dashwood.createElement("table", this._el);
        this._code = [];
        this._interval = setInterval(() => {
            eval(this._code[Math.floor(Math.random()*this._code.length)]);
        }, 3500);
    }

    dashwood.DemoControls.prototype.addTestCode = function(code, exec) {
        var tr = dashwood.createElement("tr", this._elTable);
        var td0 = dashwood.createElement("td", tr);
        var input = dashwood.createElement("input", td0);
        input.type = "text";
        input.readonly = true;
        input.value = code;
        if (exec) {
            td0.colSpan = "2";
            eval(code);
        } else {
            this._code.push(code);
            var td1 = dashwood.createElement("td", tr);
            var btn = dashwood.createElement("button", td1);
            btn.style.display = "block";
            btn.innerText = "RUN";
            btn.onclick = () => {
                clearInterval(this._interval);
                eval(code);
            };
        }
    }

    dashwood.DemoControls.prototype.addTestCodeArray = function(code, exec) {
        code.forEach((c) => {
            this.addTestCode(c, exec);
        });
    }

})();
