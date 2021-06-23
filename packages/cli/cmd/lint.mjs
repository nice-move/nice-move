import { createRequire } from 'module';

const requireJson = createRequire(import.meta.url);

const { description } = requireJson('@nice-move/lint/package.json');

export const command = 'lint';

export const describe = description;

export const builder = {
  shell: {
    alias: 'x',
    default: false,
    describe: 'skip parsing of tasks for better shell support',
    type: 'boolean',
  },
};

export { lint as handler } from '@nice-move/lint';
