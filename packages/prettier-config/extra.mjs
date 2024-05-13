export default {
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
      extensions: ['.vegalite', '.vega'],
    },
    {
      name: 'Markmap',
      parsers: ['markdown'],
      extensions: ['.markmap'],
    },
    {
      name: 'Bpmn',
      parsers: ['xml'],
      extensions: ['.bpmn'],
    },
    {
      name: 'excalidraw',
      parsers: ['json'],
      extensions: ['.excalidraw'],
    },
    {
      name: 'clojure',
      parsers: ['clojure'],
      extensions: ['.clj'],
    },
    {
      name: 'bytefield',
      parsers: ['clojure'],
      extensions: ['.bytefield'],
    },
  ],
};
