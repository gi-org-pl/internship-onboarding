#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

const usage = `Usage: node scripts/publish.mjs <folder> "<milestone title>" "<Name Surname>[=<github login>]"... [options]

Options:
  --due YYYY-MM-DD   due date of the milestone, when it is created
  --repo OWNER/NAME  repository of the issues (default: gi-org-pl/product)
  --label NAME       label of the issues (default: Systemic internships)
  --dry-run          create nothing, write the rendered issues to a temporary folder
  --first N          with --dry-run, number the first issue N instead of the next free number`;

const { values: opts, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    due: { type: 'string' },
    repo: { type: 'string', default: 'gi-org-pl/product' },
    label: { type: 'string', default: 'Systemic internships' },
    'dry-run': { type: 'boolean', default: false },
    first: { type: 'string' },
    help: { type: 'boolean', short: 'h', default: false },
  },
});

const [folder, milestoneTitle, ...people] = positionals;
if (opts.help || !folder || !milestoneTitle || people.length === 0) {
  console.error(usage);
  process.exit(opts.help ? 0 : 1);
}
if (opts.due && !/^\d{4}-\d{2}-\d{2}$/.test(opts.due)) fail(`--due must be YYYY-MM-DD, got ${opts.due}`);
if (opts.first && !opts['dry-run']) fail('--first only works with --dry-run');

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const linkPattern = /\[([a-z0-9-]+)\]\((\d{2}-[a-z0-9-]+\.md)\)/g;

const tasks = readdirSync(join(root, folder))
  .filter((file) => /^\d{2}-[a-z0-9-]+\.md$/.test(file))
  .sort()
  .map((file) => {
    const text = readFileSync(join(root, folder, file), 'utf8');
    const heading = text.match(/^# (.+)\n\n/);
    if (!heading) fail(`${folder}/${file} must start with "# <Task title>" and a blank line`);
    return { file, title: heading[1].trim(), template: text.slice(heading[0].length) };
  });
if (tasks.length === 0) fail(`${folder} has no task files (NN-task-name.md)`);

const position = new Map(tasks.map((task, i) => [task.file, i]));
for (const task of tasks) {
  for (const [, , target] of task.template.matchAll(linkPattern)) {
    if (!position.has(target)) fail(`${folder}/${task.file} links to ${target}, which is not a task in ${folder}`);
  }
}

const interns = people.map((person) => {
  const [name, login] = person.split('=').map((part) => part.trim());
  if (!name) fail(`Empty intern name in "${person}"`);
  return { name, login: login || undefined };
});

function fail(message) {
  console.error(message);
  process.exit(1);
}

function gh(args, input) {
  return execFileSync('gh', args, { input, encoding: 'utf8', stdio: ['pipe', 'pipe', 'inherit'] });
}

function api(path, method = 'GET', body) {
  const args = ['api', '--method', method, path];
  if (body) args.push('--input', '-');
  const output = gh(args, body ? JSON.stringify(body) : undefined);
  return output.trim() ? JSON.parse(output) : null;
}

function render(i, numbers) {
  return tasks[i].template
    .replace(linkPattern, (_, name, target) => `${name} (#${numbers[position.get(target)]})`)
    .replaceAll('{{issue}}', String(numbers[i]));
}

function nextNumber() {
  const [latest] = api(`repos/${opts.repo}/issues?state=all&sort=created&direction=desc&per_page=1`);
  return (latest?.number ?? 0) + 1;
}

function assignable(login) {
  try {
    execFileSync('gh', ['api', `repos/${opts.repo}/assignees/${login}`], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

const milestones = api(`repos/${opts.repo}/milestones?state=all&per_page=100`);
const existing = milestones.find((milestone) => milestone.title === milestoneTitle);

const notAssignable = interns.filter(({ login }) => login && !assignable(login));
if (notAssignable.length > 0) {
  fail(`Cannot assign ${notAssignable.map(({ login }) => login).join(', ')} in ${opts.repo}: add them to the organisation first, or leave the login out`);
}

if (opts['dry-run']) {
  const out = mkdtempSync(join(tmpdir(), 'internship-'));
  let first = opts.first ? Number(opts.first) : nextNumber();
  console.log(existing ? `Milestone "${milestoneTitle}" exists (#${existing.number})` : `Would create milestone "${milestoneTitle}"`);
  for (const { name, login } of interns) {
    const numbers = tasks.map((_, i) => first + i);
    tasks.forEach((task, i) => {
      const title = `${name} - ${task.title}`;
      writeFileSync(join(out, `${numbers[i]}.md`), `${title}\n\n${render(i, numbers)}`);
      console.log(`#${numbers[i]}  ${title}${login ? `  @${login}` : ''}`);
    });
    first += tasks.length;
  }
  console.log(`Rendered issues: ${out}`);
  process.exit(0);
}

let milestone = existing?.number;
if (milestone) {
  console.log(`Using milestone "${milestoneTitle}" (#${milestone})`);
} else {
  const description = readFileSync(join(root, 'README.md'), 'utf8').trim();
  const created = api(`repos/${opts.repo}/milestones`, 'POST', {
    title: milestoneTitle,
    description,
    ...(opts.due && { due_on: `${opts.due}T00:00:00Z` }),
  });
  milestone = created.number;
  console.log(`Created milestone "${milestoneTitle}" (#${milestone})`);
}

let first = nextNumber();
for (const { name, login } of interns) {
  const predicted = tasks.map((_, i) => first + i);
  const numbers = tasks.map((task, i) => {
    const issue = api(`repos/${opts.repo}/issues`, 'POST', {
      title: `${name} - ${task.title}`,
      body: render(i, predicted),
      labels: [opts.label],
      milestone,
      ...(login && { assignees: [login] }),
    });
    console.log(`#${issue.number}  ${issue.title}  ${issue.html_url}`);
    return issue.number;
  });
  if (numbers.some((number, i) => number !== predicted[i])) {
    tasks.forEach((_, i) => api(`repos/${opts.repo}/issues/${numbers[i]}`, 'PATCH', { body: render(i, numbers) }));
    console.log(`Renumbered the links between ${name}'s issues`);
  }
  first = numbers.at(-1) + 1;
}
