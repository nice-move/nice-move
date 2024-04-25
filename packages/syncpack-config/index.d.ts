import type { RcFile } from 'syncpack';

declare const defineConfig: (url: string, config: RcFile) => RcFile;

export = defineConfig;
