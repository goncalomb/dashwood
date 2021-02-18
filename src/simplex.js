const templateMap = new WeakMap();
const styleSheetMap = new WeakMap();

export default function simplex(el) {
    return class extends el {
        connectedCallback() {
            this.attachShadow({ mode: 'open' });

            const {
                template: templateCtor = null,
                style: styleCtor = null,
                styleSheets: styleSheetsCtor = []
            } = this.constructor;

            // template

            let template = templateMap.get(this.constructor);
            if (!template && templateCtor) {
                template = document.createElement('template');
                template.innerHTML = templateCtor;
                templateMap.set(this.constructor, template);
            }
            if (template) {
                this.shadowRoot.appendChild(template.content.cloneNode(true));
            }

            // style

            const adoptedStyleSheets = [...styleSheetsCtor];

            let stylesheet = styleSheetMap.get(this.constructor);
            if (!stylesheet && styleCtor) {
                stylesheet = new CSSStyleSheet();
                stylesheet.replaceSync(styleCtor);
                styleSheetMap.set(this.constructor, stylesheet);
            }
            if (stylesheet) {
                adoptedStyleSheets.push(stylesheet);
            }

            if (adoptedStyleSheets.length) {
                this.shadowRoot.adoptedStyleSheets = adoptedStyleSheets;
            }

            // initialize

            if (this.initialize) this.initialize();
            if (this.update) this.update();
        }

        attributeChangedCallback() {
            if (this.update) this.update();
        }
    }
}

export const HTMLElementSX = simplex(HTMLElement);
