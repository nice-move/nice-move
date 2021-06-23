import { Text } from 'fs-chain';

export function action() {
  new Text()
    .source('~stylelint/lib/augmentConfig')
    .onFail()
    .onDone((data) => {
      if (data.includes('ignoreFiles, ...')) {
        return data.replace('ignoreFiles, ...', '...');
      }
      return data;
    })
    .output()
    .catch(console.warn);
}
