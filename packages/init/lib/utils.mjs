import { execSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import stringify from 'stringify-author';

export async function download(url) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(url, { signal: controller.signal });

    // Clear the timeout as request completed
    clearTimeout(timeoutId);

    const text = await response.text();
    const data = text.trim();

    if (data) {
      return data;
    }

    throw new Error('template download fail');
  } catch (error) {
    // Clear the timeout to prevent memory leaks
    clearTimeout(timeoutId);

    if (error.name === 'AbortError') {
      throw new Error('request timeout');
    }

    throw error;
  }
}

export function emptyDir() {
  return (
    readdirSync(process.cwd()).filter((item) => item !== '.git').length === 0
  );
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

export function getPkg() {
  try {
    return JSON.parse(readFileSync(join(process.cwd(), 'package.json')));
  } catch {
    return {};
  }
}
