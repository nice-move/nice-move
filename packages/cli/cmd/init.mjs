import { createRequire } from 'module';

const requireJson = createRequire(import.meta.url);

const { description } = requireJson('@nice-move/init/package.json');

export const command = 'init';

export const describe = description;

export { init as handler } from '@nice-move/init';
