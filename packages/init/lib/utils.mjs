import { readdirSync } from 'fs';
import { createRequire } from 'module';

import centra from 'centra';
import execa from 'execa';
import stringify from 'stringify-author';

export function download(url) {
  return centra(url)
    .timeout(5000)
    .send()
    .then((response) => {
      if (response.statusCode === 301) {
        return download(response.headers.location);
      }
      return response.text();
    })
    .then((response) => {
      const data = response.trim();
      if (data) {
        return data;
      }
      throw new Error('template download fail');
    });
}

export async function gitSupport() {
  try {
    const { stdout } = await execa('git', ['--version']);
    return Boolean(stdout);
  } catch {
    return false;
  }
}

export function pkgCwd() {
  try {
    return createRequire(`${process.cwd()}/`)('./package.json');
  } catch {
    return {};
  }
}

export function emptyDir() {
  return readdirSync(process.cwd()).length === 0;
}

export function trim(value) {
  return value ? value.trim() : undefined;
}

function getUser() {
  return import('user-meta')
    .then(({ default: meta }) => meta)
    .catch(() => ({}));
}

export async function getAuthor(author) {
  if (author) {
    return author;
  }

  const meta = await getUser();

  return meta.name ? stringify(meta) : 'Unknown';
}

export async function getAuthorName(author) {
  return (await getAuthor(author)).name || 'Unknown';
}
