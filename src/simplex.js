const templateMap = new WeakMap();

export default function simplex(el) {
    return class extends el {
        connectedCallback() {
            this.attachShadow({ mode: 'open' });
            let template = templateMap.get(this.constructor);
            if (!template) {
                template = document.createElement('template');
                if (this.constructor.template) {
                    template.innerHTML = this.constructor.template;
                }
            }
            this.shadowRoot.appendChild(template.content.cloneNode(true));

            if (this.initialize) this.initialize();
            if (this.update) this.update();
        }

        attributeChangedCallback() {
            if (this.update) this.update();
        }
    }
}

export const HTMLElementSX = simplex(HTMLElement);
