import { init } from '../lib/index.mjs';

init().catch((error) => {
  if (error.message !== 'cancel') {
    throw error;
  }
});
