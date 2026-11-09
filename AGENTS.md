# AGENTS.md

This repository holds the tasks of the Generacja Innowacja internship as templates. Every internship group gets them as GitHub issues in [`gi-org-pl/product`](https://github.com/gi-org-pl/product): one set per intern, in one milestone per group, tracked on the [internships project](https://github.com/orgs/gi-org-pl/projects/26).

## Layout

| Path                                     | What it is                                                                                       |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `README.md`                              | The welcome page for interns. It is also the description of every group's milestone.             |
| `personal-page-and-blog/`                | One curriculum milestone: a personal page with a blog, a React front end and a Nest.js back end. |
| `personal-page-and-blog/NN-task-name.md` | One task. `NN` is the order in which the issues are created.                                     |
| `scripts/publish.mjs`                    | Publishes a folder as issues for a group of interns.                                             |

## Publishing a new group

Ask for what you cannot find:

- The group number. Milestones are named `Internship NN-YYYY` and numbered one after another: `Internship 07-2026` was followed by `Internship 08-2026`. List them with `gh api "repos/gi-org-pl/product/milestones?state=all" --jq '.[].title'`.
- The interns' names, spelled exactly as they should appear in the issue titles, with Polish letters.
- Their GitHub logins, if they are already in the organisation. Without a login the issue is not assigned, and the intern assigns themselves, as `README.md` tells them.
- The due date of the milestone, if there is one.

Then:

1. Run the script with `--dry-run` and read what it would create. It writes the rendered issues to a temporary folder; open one or two.

   ```bash
   node scripts/publish.mjs personal-page-and-blog "Internship 08-2026" "Alan Maron" "Jan Kowalski=jkowalski" --dry-run
   ```

2. Run it again without `--dry-run`. It creates the milestone with `README.md` as its description (or reuses one with the same title), then each intern's issues in file order, with the `Systemic internships` label. Links between tasks become that intern's issue numbers, and `{{issue}}` becomes the issue's own number. If someone else creates an issue at the same time, the numbers shift and the script fixes the links.
3. Check that the issues reached the project. The project adds every issue with the `Systemic internships` label by itself; the timeline of an issue shows an `added_to_project_v2` event.
4. Add a view for the group to the [project](https://github.com/orgs/gi-org-pl/projects/26), named like the milestone, filtered with `milestone:"Internship NN-YYYY"`. Copy the layout of the previous group's view. Views need the `project` scope: `gh auth refresh -s project`.
5. Organisation membership and the group's team (`interns-YYYY-NN`, a child of `interns` with `push` on `product`) live in [`gi-org-pl/github-iac`](https://github.com/gi-org-pl/github-iac), in `config/members.yaml` and `config/teams.yaml`. That needs the interns' GitHub logins and a pull request there.

The script needs `gh` logged in with the `repo` scope and Node.js 22 or newer.

## Changing a task

- The file starts with `# <Task title>` and a blank line. The title becomes `{Name Surname} - {Task title}` in the issue. The rest of the file is the issue body, as it is.
- Link another task of the same folder as `[task-name](NN-task-name.md)`. It is published as `task-name (#123)`. The script stops if a link points at a file that does not exist.
- Write `{{issue}}` where the task's own issue number goes, as in branch names: `feature/blog-section-{{issue}}`.
- Leave every checkbox in the Definition of Done unticked.
- Keep the sections in the order `README.md` describes under “How to read a task”.
- Renaming or reordering files changes the order and the numbers of the next group's issues. Check every link after you do it.
- Issues already published do not change with the templates. Edit them in `product` only when you are asked to.

Change this repository through pull requests, with commit messages and pull request titles in the present simple tense, for example `Add the comments task`.
