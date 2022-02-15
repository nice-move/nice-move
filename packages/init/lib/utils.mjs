import { execSync } from 'child_process';
import { readdirSync } from 'fs';

import centra from 'centra';
import { execa } from 'execa';
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

export function emptyDir() {
  return readdirSync(process.cwd()).length === 0;
}

export function trim(value) {
  return value ? value.trim() : undefined;
}

function getUser() {
  try {
    return {
      name: execSync('git config user.name').toString().trim(),
      email: execSync('git config user.email').toString().trim(),
    };
  } catch {
    return {};
  }
}

export async function getAuthor(author) {
  if (author) {
    return author;
  }

  const meta = getUser();

  return meta.name ? stringify(meta) : 'Unknown';
}

export async function getAuthorName(author) {
  const info = await getAuthor(author);

  return info.name || 'Unknown';
}
