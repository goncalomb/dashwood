import { HTMLElementSX } from '../simplex';

class SamaritanMarquee extends HTMLElementSX {
    static template = `
        <style>
            .marquee {
                margin: 0 auto;
                text-align: center;
            }

            .marquee .text {
                display: inline-block;
                font-family: "Mono MMM 5";
                font-size: 23px;
                line-height: 23px;
                min-height: 23px;
                color: transparent;
                white-space: nowrap;
                transition-duration: 200ms;
            }

            .marquee.mode-banner .text {
                color: white;
                background-color: black;
                letter-spacing: 8px;
                padding: 5px 0px 5px 10px;
                border-radius: 2px;
            }

            .marquee.mode-text .text {
                color: black;
                transition: none;
            }

            .marquee .line {
                margin: 0 auto;
                width: 0;
                border-bottom: 2px solid black;
            }

            .marquee.mode-text .line {
                width: 30px;
                transition-duration: 200ms;
            }

            .marquee .arrow {
                display: none;
                border-bottom: 10px solid transparent;
                border-left: 6px solid transparent;
                border-right: 6px solid transparent;
            }

            .marquee.mode-text .arrow {
                display: inline-block;
            }

            .marquee .arrow-animation {
                border-bottom: 10px solid #330000;
                -webkit-animation: samaritan-arrow-animation 1000ms alternate infinite linear;
                animation: samaritan-arrow-animation 1000ms alternate infinite linear;
            }

            @-webkit-keyframes samaritan-arrow-animation {
                from { border-bottom-color: #330000; }
                to { border-bottom-color: #cc0000; }
            }

            @keyframes samaritan-arrow-animation {
                from { border-bottom-color: #330000; }
                to { border-bottom-color: #cc0000; }
            }
        </style>
        <div class="marquee">
            <div class="text"></div>
            <div class="line"></div>
            <div class="arrow arrow-animation"></div>
        </div>
    `;

    initialize() {
        this._el = this.shadowRoot.querySelector('.marquee');
        this._elText = this.shadowRoot.querySelector('.text');
        this._elLine = this.shadowRoot.querySelector('.line');
        this._elArrow = this.shadowRoot.querySelector('.arrow');

        this._timeout = 0;
        this.waiting();
    }

    _setMode(mode) {
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

    _resizeUnderline(off) {
        var w = parseFloat(window.getComputedStyle(this._elText).width);
        this._elLine.style.width = (w + off) + "px";
    }

    clear() {
        this._setMode(null);
        if (this._elText.innerText == "-") {
            this._elText.innerText = "";
        } else {
            this._timeout = setTimeout(() => {
                this._elText.innerText = "";
            }, 200);
        }
    }

    banner(value) {
        if (!value) return this.clear();
        this._setMode("banner");
        this._elText.innerText = value;
    }

    animate(text, staticEnd) {
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

    waiting() {
        this._setMode("text");
        this._elText.innerText = "-";
        this._elText.style.opacity = "0";
        this._elLine.style.width = "";
        this._elArrow.classList.add("arrow-animation");
    }

    static(value) {
        if (!value) return this.clear();
        this._setMode("text");
        this._elText.innerText = value;
        this._resizeUnderline(80);
        this._elArrow.classList.remove("arrow-animation");
    }
}

customElements.define('dw-samaritan-marquee', SamaritanMarquee);
