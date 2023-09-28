'use strict';

module.exports = {
  languages: [
    {
      name: 'WaveDrom',
      parsers: ['json5'],
      extensions: ['.wavedrom'],
    },
    {
      name: 'WireViz',
      parsers: ['yaml'],
      extensions: ['.wireviz'],
    },
    {
      name: 'VegaLite',
      parsers: ['json'],
      extensions: ['.vegalite'],
    },
    {
      name: 'Markmap',
      parsers: ['markdown'],
      extensions: ['.markmap'],
    },
  ],
};
