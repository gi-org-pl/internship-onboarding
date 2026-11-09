# Internship onboarding

Tools for the people who run the Generacja Innowacja internship. This repository keeps the internship tasks as templates and turns them into GitHub issues for every new group of interns: one set of issues per intern in [`gi-org-pl/product`](https://github.com/gi-org-pl/product), one milestone per group, tracked on the [internships project](https://github.com/orgs/gi-org-pl/projects/26).

Interns do not work in this repository. They get the issues.

## Start a new group with Claude

You need:

- [Claude Code](https://claude.com/claude-code)
- the [GitHub CLI](https://cli.github.com/), logged in with an account that can create issues in `product`, and allowed to edit projects: `gh auth login`, then `gh auth refresh -s project`

Then:

1. Clone this repository and start Claude Code in it:

   ```bash
   gh repo clone gi-org-pl/internship-onboarding
   cd internship-onboarding
   claude
   ```

2. Tell Claude who the new interns are, for example:

   > Create the tasks for Internship 09-2026 for Jan Kowalski, Anna Nowak and Piotr Wiśniewski.

   Spell the names the way they should appear in the issue titles, with Polish letters. If the interns are already in the organisation, add their GitHub logins and Claude assigns the issues to them. Add a due date if the group has one.

3. Claude follows [`AGENTS.md`](AGENTS.md). It shows you the issues it would create, publishes them once you agree, checks that they reached the project and sets up the group's view there.

Claude can also prepare the interns' organisation access: members and the group's team live in [`gi-org-pl/github-iac`](https://github.com/gi-org-pl/github-iac), and need the interns' GitHub logins.

## What is in it

| Path                                     | What it is                                                                                         |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `personal-page-and-blog/`                | The tasks of one curriculum: a personal page with a blog, a React front end and a Nest.js back end |
| `personal-page-and-blog/README.md`       | The welcome text for interns, published as the description of the group's milestone                |
| `personal-page-and-blog/NN-task-name.md` | One task, published as one issue per intern, in `NN` order                                         |
| `AGENTS.md`                              | How Claude publishes a group, and the rules for writing tasks                                      |

## Changing the tasks

Edit the Markdown files and open a pull request. Only groups published after the merge get the change; issues already in `product` stay as they are. The rules for links, branch names and checkboxes are in [`AGENTS.md`](AGENTS.md#changing-a-task), and Claude follows them when you ask it to write or change a task.
