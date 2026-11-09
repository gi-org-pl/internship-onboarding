# Front-end repository

> Create your front-end repository from our React template, make it your own and get it running on your machine.

> 💬 **Stuck or unsure?** Ask on your internship channel. Ask early, even before you have code to show.

## Story

As an intern, I want my own front-end project, created from our React template and running on my machine, so that I can build my personal page the way our teams build theirs.

## Why we are doing this

All our new front ends start from the same template, so every project has the same tools, scripts and folder layout. In this task you create your repository from it, make it your own, check that every tool works, and go through your first pull request. You write no features yet.

## What our React template is

[`vite-project-boilerplate`](https://github.com/gi-org-pl/vite-project-boilerplate) is a **template repository** on GitHub. “Use this template” copies all its files into a new repository of yours, with a fresh history. It already has:

| What                           | What it gives you                                                                                    |
| ------------------------------ | ---------------------------------------------------------------------------------------------------- |
| Vite 7                         | The dev server, with instant reload, and the production build                                        |
| React 19 and TypeScript        | The UI library and the language                                                                      |
| React Router 7, framework mode | Routing: every file in `src/pages/` is a page. The app runs fully in the browser (`ssr: false`)      |
| Tailwind CSS 4                 | Styling with utility classes, such as `flex`, `p-4` or `text-lg`                                     |
| Athena                         | [Our component library](https://github.com/gi-org-pl/athena), with our colour theme                  |
| Axios and Zod                  | Calling an API and checking what it answers                                                          |
| Zustand                        | Shared state, for when React’s own state is not enough                                               |
| Vitest and Testing Library     | Unit tests, kept next to the code they test                                                          |
| Playwright                     | End-to-end tests that click through the app in a real browser                                        |
| Storybook                      | A catalogue where you see each component on its own, in every state                                  |
| Biome                          | Lint and formatting in one tool. It replaces ESLint and Prettier                                     |
| Husky                          | Runs the linter before every commit                                                                  |
| CI and a pull request template | Build, unit tests and lint on every pull request, and a checklist for every pull request description |

Two differences from the back end:

- The front end runs **on your own machine**, not in Docker. You need Node.js 24 and Yarn 1.22.
- It uses **Yarn**, not npm. Never mix the two, and always commit `yarn.lock`.

## What you will build

- A **public** repository in **your own GitHub account**, created with **Use this template** (not a fork). Name it as you like.
- The project made your own: no template names left, your name in the browser tab, and a README that describes **your** project, how to run it and where its API lives.
- A `main` branch that only changes through reviewed pull requests with signed commits, and your internship supervisors invited as collaborators.

What you do with the template’s demo pages and components is up to you. Keep in mind that CI runs the unit tests, and the demo’s tests are the only ones so far.

## How it should behave

| Situation                                            | What happens                                          |
| ---------------------------------------------------- | ----------------------------------------------------- |
| A fresh clone, set up by following your README alone | The app runs at <http://localhost:5173>               |
| The browser tab                                      | Shows your name, not the template’s                   |
| `yarn lint`, `yarn test --run` and `yarn build`      | All pass                                              |
| `yarn storybook`                                     | Storybook opens at <http://localhost:6006>            |
| You open a pull request                              | CI runs build, unit tests and lint, and all are green |

## Not part of this task

- Your personal page: [about-me-page](03-about-me-page.md)
- End-to-end tests and their CI job: [about-me-page](03-about-me-page.md)
- Calling the API: [blog-section](06-blog-section.md)

## Words you might need

- **Template repository**: a GitHub repository marked as a template. “Use this template” copies its files into a new repository, without its history.
- **Dev server**: a local server that shows your app while you work on it, and reloads the page when you save a file.
- **Utility class**: a small CSS class that does one thing, such as `mt-4` (margin on top). Tailwind is built from them.
- **Component library**: a package of ready-made, tested UI components. Ours is Athena.
- **Unit test**: a fast test of one function or component on its own.
- **End-to-end (e2e) test**: a test that opens the app in a real browser and uses it like a person would.
- **Story**: one state of a component, shown in Storybook.
- **Lint**: an automatic check of the code for mistakes and style problems.
- **Git hook**: a script Git runs at a given moment, here before every commit.

## Suggested steps

1. Install [Node.js 24](https://nodejs.org/) and Yarn 1.22, as the template’s README says.
2. Create the repository from the template, clone it, and try every script from “How it should behave” **before** you change anything.
3. Make the project your own on a branch, and open your first pull request.
4. Protect `main` and invite your supervisors while CI runs.

On Windows, use [WSL 2](https://learn.microsoft.com/windows/wsl/install) and keep the repository inside the WSL file system. Our projects are tested on Ubuntu and macOS.

## Standards to follow

- [Front-end standards](https://github.com/gi-org-pl/gi-tech-standards/blob/main/docs/frontend/INDEX.md): read the index and the [fundamentals](https://github.com/gi-org-pl/gi-tech-standards/blob/main/docs/frontend/tools/FUNDAMENTALS.md)
- [Code quality](https://github.com/gi-org-pl/gi-tech-standards/blob/main/docs/frontend/tools/CODE_QUALITY.md): Biome runs on every commit and in CI
- [Git & GitHub: first steps](https://github.com/gi-org-pl/gi-tech-standards/blob/main/docs/github/FIRST_STEPS.md): signed commits
- Name your branch `chore/frontend-repository-{{issue}}`, following [Conventional Branch](https://conventional-branch.github.io/)

## Depends on

Nothing. You can do [backend-repository](01-backend-repository.md) at the same time.

## Resources

- [vite-project-boilerplate](https://github.com/gi-org-pl/vite-project-boilerplate): the template
- [Athena](https://github.com/gi-org-pl/athena): our component library
- [GitHub: creating a repository from a template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template)
- [GitHub: rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets)
- [Vite: why Vite](https://vite.dev/guide/why.html)
- [React Router: framework mode](https://reactrouter.com/start/modes)
- [Yarn 1 documentation](https://classic.yarnpkg.com/docs/)

## Definition of Done

- [ ] Your front-end repository is public, in your account, and created with “Use this template”
- [ ] Someone who has never seen it can set it up and run it by following your README alone
- [ ] No template names are left (`git grep -i boilerplate` finds nothing)
- [ ] Every script in “How it should behave” works on your machine
- [ ] `main` is protected, and your supervisors are collaborators
- [ ] CI is green: build, unit tests and lint
- [ ] All commits are signed

## Questions?

If `yarn install` fails, check `node --version` first: it must start with `v24`. If that does not help, ask on your internship channel and paste the exact error message.

