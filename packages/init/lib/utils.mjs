import centra from 'centra';
import execa from 'execa';
import { readdirSync } from 'fs';
import { createRequire } from 'module';
import { sep } from 'path';
import stringify from 'stringify-author';
import meta from 'user-meta';

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

export function getAuthorName(author = {}) {
  return (typeof author === 'string' ? author : author.name)
    ? meta.name
    : 'Unknown';
}

export function dirname(path) {
  return path.split(sep).slice(-1)[0].trim();
}

export function getAuthor(author = {}) {
  const io = meta.name ? stringify(meta) : undefined;

  if (typeof author === 'string') {
    return author || io || 'Unknown';
  }

  return (author.name ? stringify(author) : io) || 'Unknown';
}
