import { HTMLElementSX } from '../simplex';

class SamaritanProgress extends HTMLElementSX {
    static template = `
        <style>
            .progress {
                font-family: "Mono MMM 5";
                font-size: 23px;
                width: 650px;
                margin: 0 auto;
            }

            .progress .header {
                display: inline-block;
                color: white;
                background-color: black;
                letter-spacing: 8px;
                padding: 5px 0px 5px 10px;
                border-radius: 2px;
                margin-bottom: 8px;
            }

            .progress .header::after {
                content: "_";
                animation: fast-flash 300ms linear infinite;
            }

            @keyframes fast-flash {
                0% { opacity: 1; }
                49% { opacity: 1; }
                50% { opacity: 0; }
                100% { opacity: 0; }
            }

            .progress .info {
                display: none;
                margin-bottom: 8px;
                white-space: nowrap;
                overflow: hidden;
            }

            .progress .bar {
                border: 2px solid black;
                padding: 3px;
            }

            .progress .bar .bar-inside {
                background: black;
                width: 0;
                height: 25px;
                transition-duration: 500ms;
            }
        </style>
        <div class="progress">
            <div class="header"></div>
            <div class="info"></div>
            <div class="bar">
                <div class="bar-inside"></div>
            </div>
        </div>
    `;

    initialize() {
        this._el = this.shadowRoot.querySelector('.progress');
        this._elHeader = this.shadowRoot.querySelector('.header');
        this._elHeader.innerText = "Loading";
        this._elInfo = this.shadowRoot.querySelector('.info');
        this._elBar = this.shadowRoot.querySelector('.bar');
        this._elBarInside = this.shadowRoot.querySelector('.bar-inside');
        this.progress(0);
    }

    header(text) {
        this._elHeader.innerText = text;
    }

    info(text) {
        if (text) {
            this._elInfo.style.display = "block";
            this._elInfo.innerText = text;
        } else {
            this._elInfo.style.display = "";
            this._elInfo.innerText = "";
        }
    }

    progress(value) {
        this._elBarInside.style.width = (value*100) + "%";
    }
}

customElements.define('dw-samaritan-progress', SamaritanProgress);
