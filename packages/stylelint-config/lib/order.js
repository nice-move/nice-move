'use strict';

module.exports = {
  plugins: 'stylelint-order',
  rules: {
    'order/properties-alphabetical-order': null,
    'order/properties-order': [
      [
        'all',

        // --------------
        'display',
        'appearance',
        'visibility',

        // Positioning --------------
        'clear',
        'float',
        'position',
        'top',
        'right',
        'bottom',
        'left',
        'z-index',

        // Flexible Box Layout --------------
        'flex',
        'flex-grow',
        'flex-shrink',
        'flex-basis',
        'flex-direction',
        'flex-flow',
        'flex-wrap',
        'order',

        // Box Alignment --------------
        'align-content',
        'align-items',
        'align-self',
        'justify-content',
        'justify-items',
        'justify-self',
        'place-content',
        'place-items',
        'place-self',
        'gap',
        'row-gap',
        'column-gap',

        // --------------
        'grid',
        'grid-area',
        'grid-template',
        'grid-template-areas',
        'grid-template-rows',
        'grid-template-columns',
        'grid-row',
        'grid-row-start',
        'grid-row-end',
        'grid-column',
        'grid-column-start',
        'grid-column-end',
        'grid-auto-rows',
        'grid-auto-columns',
        'grid-auto-flow',
        'grid-gap',
        'grid-row-gap',
        'grid-column-gap',

        // --------------
        'columns',
        'column-gap',
        'column-fill',
        'column-rule',
        'column-rule-width',
        'column-rule-style',
        'column-rule-color',
        'column-span',
        'column-count',
        'column-width',

        // --------------
        'backface-visibility',
        'perspective',
        'perspective-origin',

        // --------------
        'margin',
        'margin-top',
        'margin-right',
        'margin-bottom',
        'margin-left',

        // --------------
        'border',
        'border-top',
        'border-right',
        'border-bottom',
        'border-left',

        // --------------
        'border-width',
        'border-top-width',
        'border-right-width',
        'border-bottom-width',
        'border-left-width',

        // --------------
        'border-style',
        'border-top-style',
        'border-right-style',
        'border-bottom-style',
        'border-left-style',

        // --------------
        'border-color',
        'border-top-color',
        'border-right-color',
        'border-bottom-color',
        'border-left-color',

        // --------------
        'border-image',
        'border-image-source',
        'border-image-width',
        'border-image-outset',
        'border-image-repeat',
        'border-image-slice',

        // --------------
        'border-radius',
        'border-top-left-radius',
        'border-top-right-radius',
        'border-bottom-left-radius',
        'border-bottom-right-radius',

        // --------------
        'background',
        'background-attachment',
        'background-clip',
        'background-color',
        'background-image',
        'background-origin',
        'background-repeat',
        'background-position',
        'background-size',
        'background-blend-mode',

        // --------------
        'box-sizing',
        'width',
        'min-width',
        'max-width',
        'height',
        'min-height',
        'max-height',

        // --------------
        'padding',
        'padding-top',
        'padding-right',
        'padding-bottom',
        'padding-left',

        // Overflow --------------
        'overflow',
        'overflow-x',
        'overflow-y',
        'resize',

        // Table --------------
        'border-collapse',
        'border-spacing',
        'caption-side',
        'empty-cells',
        'table-layout',

        // Outline --------------
        'outline',
        'outline-width',
        'outline-style',
        'outline-color',
        'outline-offset',

        // Effects --------------
        'color',
        'opacity',
        'box-shadow',
        'box-decoration-break',
        'backdrop-filter',
        'filter',
        'background-blend-mode',
        'mix-blend-mode',
        'isolation',

        // --------------
        'will-change',
        'transform',
        'transform-origin',
        'transform-style',

        // --------------
        'transition',
        'transition-duration',
        'transition-property',
        'transition-timing-function',
        'transition-delay',

        // Animations --------------
        'animation',
        'animation-duration',
        'animation-timing-function',
        'animation-delay',
        'animation-iteration-count',
        'animation-direction',
        'animation-fill-mode',
        'animation-play-state',
        'animation-name',

        // Writing Modes --------------
        'direction',
        'unicode-bidi',
        'writing-mode',

        // --------------
        'hyphens',
        'vertical-align',
        'text-align',
        'text-align-last',
        'text-justify',
        'text-indent',
        'text-transform',
        'text-decoration',
        'text-decoration-color',
        'text-decoration-line',
        'text-decoration-style',
        'text-rendering',
        'text-shadow',
        'text-overflow',

        // --------------
        'word-spacing',
        'letter-spacing',
        'tab-size',
        'white-space',
        'word-break',
        'word-wrap',
        'overflow-wrap',

        // Fonts --------------
        'font',
        'font-style',
        'font-variant',
        'font-weight',
        'font-stretch',
        'font-size',
        'line-height',
        'font-family',

        'font-feature-settings',
        'font-kerning',
        'font-size-adjust',
        'font-smoothing',
        'font-variant-caps',
        'font-variant-ligatures',
        'font-variant-numeric',
        'font-variation-settings',

        // Generated Content --------------
        'content',
        'quotes',

        // Counter Styles --------------
        'counter-set',
        'counter-reset',
        'counter-increment',

        // Lists --------------
        'list-style',
        'list-style-type',
        'list-style-position',
        'list-style-image',

        // Fragmentation --------------
        'break-before',
        'break-after',
        'break-inside',
        'orphans',
        'widows',

        // --------------
        'scroll-behavior',
        'touch-action',
        'cursor',
        'pointer-events',
        'user-select'
      ],
      {
        unspecified: 'bottomAlphabetical',
        emptyLineBeforeUnspecified: 'always',
        severity: 'warning'
      }
    ]
  }
};
