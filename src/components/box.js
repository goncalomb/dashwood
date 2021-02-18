import { HTMLElementSX } from '../simplex';
import dwStyleSheet from '../stylesheet';

class SamaritanBox extends HTMLElementSX {
    static style = `
        .box {
            width: 650px;
            margin: 0 auto;
            border: 4px solid #ccc;
            border-left-width: 2px;
            border-right-width: 2px;
        }

        .header {
            background-color: #333e;
            padding: .2em .7em;
        }

        .main {
            padding: .2em .7em;
            color: white;
            background-color: black;
            border: 2px solid #ddd;
        }

        .main ::slotted(p) {
            margin: .2em 0;
        }

        .main ::slotted(p:first-child) {
            font-size: 1.2em;
        }

        .footer {
            background-color: #000e;
        }

        .footer div {
            width: 1.5em;
            height: 1.5em;
            border-right: 2px solid #ddd;
        }
    `;

    static template = `
        <div class="box dw-font">
            <div class="header"><span class="title"></span> <small class="subtitle"></small></div>
            <div class="main">
                <slot></slot>
            </div>
            <div class="footer">
                <div></div>
            </div>
        </div>
    `;

    static styleSheets = [dwStyleSheet];

    static observedAttributes = ["title", "subtitle"];

    initialize() {
        this._elTitle = this.shadowRoot.querySelector('.title');
        this._elSubtitle = this.shadowRoot.querySelector('.subtitle');
        this.update();
    }

    update() {
        this._elTitle.innerText = this.getAttribute("title") || "SAMARITAN";
        this._elSubtitle.innerText = this.getAttribute("subtitle") || "v1.0";
    }
}

customElements.define('dw-samaritan-box', SamaritanBox);
