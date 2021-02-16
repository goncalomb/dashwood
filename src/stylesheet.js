import css from 'raw-loader!./dashwood.css';

const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync(css);

export default stylesheet;
