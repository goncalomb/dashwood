/**
 * This is, by far, not a full polyfill for Constructable Stylesheets, it is
 * just enough to support the features used by this project.
 */

class CSSStyleSheetAlt {
    constructor() {
        this.el = document.createElement('style');
    }
    replaceSync(css) {
        this.el.innerHTML = css;
    }
}

function polyfill() {
    // polyfill CSSStyleSheet
    window.CSSStyleSheet = CSSStyleSheetAlt;

    // polyfill for ShadowRoot.adoptedStyleSheets
    Object.defineProperty(ShadowRoot.prototype, 'adoptedStyleSheets', {
        set(styleSheets) {
            styleSheets.forEach(ss => {
                if (ss instanceof CSSStyleSheetAlt && ss.el) {
                    this.appendChild(ss.el.cloneNode(true));
                }
            })
        }
    });
}

try {
    // try to instantiate native CSSStyleSheet
    new CSSStyleSheet();
} catch (e) {
    // if it fails, constructable stylesheets are not supported
    polyfill();
}
