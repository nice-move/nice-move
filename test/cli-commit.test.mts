import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

import { afterAll, expect, it } from 'vitest';

import { getCommitMessagePath } from '../packages/cli/src/lint/commit.mjs';

// git hooks export GIT_INDEX_FILE=.git/index, which breaks git inside a linked
// worktree, so the inherited git environment is dropped
function git(args: string[], cwd: string) {
  const env = Object.fromEntries(
    Object.entries(process.env).filter(([key]) => !key.startsWith('GIT_')),
  );

  return execFileSync('git', args, {
    cwd,
    encoding: 'utf8',
    env,
    stdio: 'pipe',
  });
}

function toPosix(path: string) {
  return path.replaceAll('\\', '/');
}

const repo = mkdtempSync(join(tmpdir(), 'nice-move-commit-'));
const worktree = join(repo, 'linked');

git(['init', '--quiet'], repo);
git(
  [
    '-c',
    'user.email=nice-move@example.com',
    '-c',
    'user.name=nice-move',
    '-c',
    'commit.gpgsign=false',
    'commit',
    '--allow-empty',
    '--quiet',
    '-m',
    'chore: init',
  ],
  repo,
);
// `--no-checkout` keeps the worktree empty: only its gitdir layout is needed
git(['worktree', 'add', '--detach', '--no-checkout', toPosix(worktree)], repo);

afterAll(() => {
  rmSync(repo, { force: true, recursive: true });
});

it('should resolve the commit message file in the main worktree', async () => {
  const path = await getCommitMessagePath(repo);

  expect(path).toBe(resolve(repo, '.git', 'COMMIT_EDITMSG'));
});

it('should resolve the commit message file from a subdirectory', async () => {
  const subdirectory = join(repo, 'packages', 'app');

  mkdirSync(subdirectory, { recursive: true });

  const path = await getCommitMessagePath(subdirectory);

  expect(path).toBe(resolve(repo, '.git', 'COMMIT_EDITMSG'));
});

it('should resolve the commit message file in a linked worktree', async () => {
  const gitdir = readFileSync(join(worktree, '.git'), 'utf8')
    .replace(/^gitdir:\s*/, '')
    .trim();

  const path = await getCommitMessagePath(worktree);

  expect(path).toBe(resolve(gitdir, 'COMMIT_EDITMSG'));
});

it('should resolve the commit message file git wrote in a linked worktree', async () => {
  git(
    [
      '-c',
      'user.email=nice-move@example.com',
      '-c',
      'user.name=nice-move',
      '-c',
      'commit.gpgsign=false',
      'commit',
      '--allow-empty',
      '--quiet',
      '-m',
      'feat: linked worktree',
    ],
    worktree,
  );

  const path = await getCommitMessagePath(worktree);

  expect(readFileSync(path, 'utf8')).toContain('feat: linked worktree');
});

it('should fail outside a git repository', async () => {
  const outside = mkdtempSync(join(tmpdir(), 'nice-move-no-git-'));

  try {
    await expect(getCommitMessagePath(outside)).rejects.toThrow();
  } finally {
    rmSync(outside, { force: true, recursive: true });
  }
});
