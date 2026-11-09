# AGENTS.md

This repository holds the tasks of the Generacja Innowacja internship as templates. You publish them with `gh` as GitHub issues in [`gi-org-pl/product`](https://github.com/gi-org-pl/product): one set per intern, in one milestone per group, tracked on the [internships project](https://github.com/orgs/gi-org-pl/projects/26). The people you work with here are internship admins, not interns.

## Layout

| Path                                     | What it is                                                                             |
| ---------------------------------------- | -------------------------------------------------------------------------------------- |
| `README.md`                              | For internship admins: what this repository is and how to start a group with Claude.   |
| `personal-page-and-blog/`                | One curriculum: a personal page with a blog, a React front end and a Nest.js back end. |
| `personal-page-and-blog/README.md`       | The welcome text for interns, published as the description of the group's milestone.   |
| `personal-page-and-blog/NN-task-name.md` | One task. `NN` is the order in which the issues are created.                           |

## Publishing a new group

Ask for what you cannot find:

- The group number. Milestones are named `Internship NN-YYYY` and numbered one after another: `Internship 07-2026` was followed by `Internship 08-2026`. List them with `gh api "repos/gi-org-pl/product/milestones?state=all" --jq '.[].title'`.
- The interns' names, spelled exactly as they should appear in the issue titles, with Polish letters. If a name looks like it lost its Polish letters (`Wegrzyn` for `Węgrzyn`), ask.
- Their GitHub logins, if they are already in the organisation. Without a login the issue is not assigned, and the intern assigns themselves, as the welcome text tells them.
- The due date of the milestone, if there is one.

`gh` needs the `repo` and `project` scopes (`gh auth refresh -s project`).

### 1. Plan, and get a yes

Work out every issue before you create any: interns in the order the person gave them, each intern's tasks in file order. Issue numbers are shared with pull requests. The next free one is:

```bash
gh api "repos/gi-org-pl/product/issues?state=all&sort=created&direction=desc&per_page=1" --jq '.[0].number + 1'
```

For each intern and task:

- Title: `{Name Surname} - {Task title}`, where the task title is the file's `# ` heading.
- Body: the file without the heading and the blank line after it, where
  - every `[task-name](NN-task-name.md)` becomes `task-name (#123)`, with 123 being **this intern's** issue for that file;
  - `{{issue}}` becomes the issue's own number.

Show the person the titles with their numbers. Create nothing until they agree.

### 2. Create the milestone

Reuse it if it exists. Otherwise:

```bash
gh api repos/gi-org-pl/product/milestones -f title="Internship 08-2026" -f description="$(cat personal-page-and-blog/README.md)" --jq '.number'
```

Add `-f due_on=2026-12-04T00:00:00Z` when there is a due date.

### 3. Create the issues

One at a time, in the planned order, with the `Systemic internships` label and the milestone number. Add `-f 'assignees[]=LOGIN'` when you have a login; `gh api repos/gi-org-pl/product/assignees/LOGIN` answers 204 if the login can be assigned.

```bash
gh api repos/gi-org-pl/product/issues -f title="Alan Maron - Back-end repository" -F body=@body.md -f 'labels[]=Systemic internships' -F milestone=7 --jq '.number'
```

Compare every returned number with the plan. If someone else created an issue in the meantime, the numbers shift: render that intern's bodies again with the real numbers and update them with `gh api -X PATCH repos/gi-org-pl/product/issues/N -F body=@body.md`. Plan the next intern from the last number you got, not from the query above, which lags behind issues created a moment ago.

### 4. Check

- `gh issue list -R gi-org-pl/product --milestone "Internship 08-2026" --state all --limit 200 --json number,title` lists every planned issue.
- No body contains `.md)` or `{{issue}}`, and every intern's links point at their own issues.
- The project adds every issue with the `Systemic internships` label by itself: the timeline of an issue (`gh api repos/gi-org-pl/product/issues/N/timeline --jq '.[].event'`) shows `added_to_project_v2`.

### 5. Add the group's view to the project

A board named `NN-YYYY` like the earlier views, with the same fields:

```bash
gh api -X POST orgs/gi-org-pl/projectsV2/26/views --input - <<'EOF'
{"name": "08-2026", "layout": "board", "filter": "milestone:\"Internship 08-2026\"", "visible_fields": [351396087, 351396088, 351396089, 351396091, 351396097, 351411300, 351411327]}
EOF
```

The numbers are the project's Title, Assignees, Status, Linked pull requests, Sub-issues progress, Start date and End date fields (`gh api orgs/gi-org-pl/projectsV2/26/fields`). The board's columns are the Status values.

### 6. Organisation access

Membership and the group's team live in [`gi-org-pl/github-iac`](https://github.com/gi-org-pl/github-iac), in `config/members.yaml` and `config/teams.yaml`. That needs the interns' GitHub logins and a pull request there. The team is `interns-YYYY-NN`, a child of `interns`, with the same `repositories` as the previous group's team. Match logins to names by the GitHub profiles (`gh api users/LOGIN --jq .name`), and ask about any you cannot match.

Finish with the links to the milestone and the view.

## Changing a task

- The file starts with `# <Task title>` and a blank line. The title becomes `{Name Surname} - {Task title}` in the issue. The rest of the file is the issue body, as it is.
- Link another task of the same folder as `[task-name](NN-task-name.md)`. It is published as `task-name (#123)`. Every link must point at a file that exists.
- Write `{{issue}}` where the task's own issue number goes, as in branch names: `feature/blog-section-{{issue}}`.
- Leave every checkbox in the Definition of Done unticked.
- Keep the sections in the order the folder's `README.md` describes under “How to read a task”.
- Renaming or reordering files changes the order and the numbers of the next group's issues. Check every link after you do it.
- Issues already published do not change with the templates. Edit them in `product` only when you are asked to.

Change this repository through pull requests, with commit messages and pull request titles in the present simple tense, for example `Add the comments task`.
