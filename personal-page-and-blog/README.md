Welcome! This folder holds everything you will build during the internship. Each milestone is a folder, each task in it is one file, and one task should become one pull request.

> 💬 **Stuck or unsure?** Ask on your internship channel on Discord. Ask early, even before you have code to show. Nobody expects you to know our stack yet: that is what this internship is for.

## How we work

These rules apply to every task in every milestone. They are the same rules our product teams follow, so learning them now pays off later.

### Before your first task

1. Read [Git & GitHub: first steps](https://github.com/gi-org-pl/gi-tech-standards/blob/main/docs/github/FIRST_STEPS.md) and set up Git as it says: your real name, commit signing with your SSH key, two-factor authentication and your organisation e-mail on GitHub. **Pull requests with unsigned commits cannot be merged.**
2. Read [Reflective AI usage](https://github.com/gi-org-pl/gi-tech-standards/blob/main/docs/ai/REFLECTIVE_AI_USAGE.md). You may use AI tools, and we encourage it. You stay in charge: you must understand every line you push, and at review we will ask how you used AI and what you learned.
3. Skim the [GI Tech Standards](https://github.com/gi-org-pl/gi-tech-standards). You do not need to remember them. Each task links the parts it uses.

### For every task

1. Your mentor publishes the task as an issue named `{Your name and surname} - {task title}`, as in earlier internships. Assign yourself and move the issue to “In progress” in GitHub Projects ([how we use Projects](https://github.com/gi-org-pl/gi-tech-standards/blob/main/docs/github/PROJECTS.md)).
2. Create a branch from an up-to-date `main`. Every task gives the exact branch name, in the shape `{type}/{task-name}-{issue number}`, following [Conventional Branch](https://conventional-branch.github.io/). Never keep a generated or default branch name.
3. Commit often, with messages in the present simple tense, for example `Add the articles module`.
4. Open a pull request in **your** repository when the task’s “Definition of Done” is met and CI is green. Write the title in the present simple tense, assign yourself and request a review from your internship supervisors (back end or front end, depending on the repository).
5. Post the link on your internship channel and move the issue to “Code review”.
6. Reviewers use [conventional comments](https://github.com/gi-org-pl/gi-tech-standards/blob/main/docs/process/CODE_REVIEW.md#conventional-comments) (`[blocking]`, `[suggestion]`, `[question]`, …). Answer every comment, but do not resolve threads yourself: the reviewer resolves them.
7. After approval, merge the pull request yourself, delete the branch and close the issue.

The full process is in [Code review](https://github.com/gi-org-pl/gi-tech-standards/blob/main/docs/process/CODE_REVIEW.md).

### Your repositories are yours

You create every repository in **your own GitHub account**, not in the organisation, and keep it **public** so mentors can review it. You own it after the internship, too: it is a good thing to show in your portfolio.

Never commit secrets: `.env` files, tokens or passwords. The templates already ignore `.env` for you.

## How to read a task

A task tells you **what** to build and which of our standards apply. **How** you build it is up to you: the design, the components, the endpoints and the code are your decisions. Be ready to explain them in review.

Every task file has the same sections:

- **Story** and **Why we are doing this**: the goal, in plain words.
- **What you will build**: the outcome and its requirements, plus heads-ups about the templates where you will need them.
- **How it should behave**: one row per situation. Each row should become a test.
- **Not part of this task**: what to leave for later.
- **Words you might need**: a small glossary.
- **Suggested steps**: one possible order of work. Follow it or not.
- **Standards**, **Depends on**, **Resources**, **Definition of Done**.

Links between tasks are relative paths in this repo. When a task is published as an issue, replace them with issue numbers.

## Questions?

Ask on your internship channel. If you find a mistake or a gap in a task, say so there too, and we will fix the task.
