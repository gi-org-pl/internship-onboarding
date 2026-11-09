# Back-end repository

> Create your API repository from our Nest.js template, make it your own and get it running on your machine.

> 💬 **Stuck or unsure?** Ask on your internship channel. Ask early, even before you have code to show.

## Story

As an intern, I want my own API project, created from our Nest.js template and running on my machine, so that I can build the back end of my blog the way our teams build theirs.

## Why we are doing this

None of our back ends starts from an empty folder. They all start from the same template, so every project has the same tools, the same folder layout and the same scripts. A developer who knows one project can find their way around any other.

In this task you write no features yet. You create the repository, make it your own, get it running, and go through your first pull request. Every later back-end task builds on it.

## What our Nest.js template is

[`nestjs-project-boilerplate`](https://github.com/gi-org-pl/nestjs-project-boilerplate) is a **template repository** on GitHub. “Use this template” copies all its files into a new repository of yours, with a fresh history. It is a ready-made starting point that already has:

| What                      | What it gives you                                                                                                                |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Nest.js 11 and TypeScript | The framework: modules, controllers, dependency injection                                                                        |
| Docker and Docker Compose | The app and the database run in containers, the same way on every machine                                                        |
| PostgreSQL 16             | The database                                                                                                                     |
| Prisma 7                  | Database schema, migrations, seed data and a typed client to query the database                                                  |
| A dev entrypoint          | On every start: installs packages, generates the Prisma client, applies migrations, seeds data and starts Nest in watch mode     |
| Swagger                   | Interactive API documentation at <http://localhost/api>                                                                          |
| Validation                | Checks request bodies and answers `400` with a list of `violations`                                                              |
| Helpers                   | A decorator that rejects IDs that are not UUIDs, a bearer-token guard for admin endpoints, and CORS set up for a local front end |
| ESLint and Prettier       | Code style checks, so reviews can focus on what the code does                                                                    |
| Cucumber                  | Functional tests written in plain English that send real HTTP requests to the running app                                        |
| CI and release workflows  | Checks on every pull request, and a release on every merge to `main`                                                             |

One rule comes with it: **run `npm`, `npx` and `node` only inside the `app` container**, never on your own machine. For example, `docker compose exec app npm run lint`. This way everyone uses the same Node.js version and the same packages. You do not even need Node.js installed for this repository.

## What you will build

- A **public** repository in **your own GitHub account**, created with **Use this template** (not a fork). Name it as you like.
- The project made your own: no template names left in the code, the docs or the config, a README that describes **your** project and how to run it, and a version you will bump in every pull request.
- A `main` branch that only changes through reviewed pull requests with signed commits, and your internship supervisors invited as collaborators, so you can request their review.

Take your time to read the template before you change it. Knowing what each file does is the real goal of this task.

### Heads-up: what does not fit a personal repository

The template is made for the organisation. A few things in it point at the organisation and will not work in your account as they are:

- `CODEOWNERS` names organisation teams that do not exist in your account.
- The release workflow pushes Docker images to the organisation’s registry. There is nowhere to deploy in this milestone, so decide what to keep: a tag and a GitHub release per merge still teach you versioning, and the version check in CI compares with those tags. In a personal repository, a workflow that pushes tags needs write permission.
- The README is out of date: it mentions Dokku, Prisma 6 and a clone URL that is not ours.

## How it should behave

| Situation                                                                    | What happens                                                         |
| ---------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| A fresh clone, set up by following your README alone                         | Both containers start and become healthy                             |
| `GET http://localhost/`                                                      | `200`, with the status and your version                              |
| Open <http://localhost/api>                                                  | Swagger UI, describing your project, not the template                |
| `npm run format`, `npm run lint`, `npm run test:functional` in the container | All pass                                                             |
| You open a pull request                                                      | CI runs and is green                                                 |
| You merge a pull request                                                     | Nothing fails. If you kept releases, a tag and a release are created |
| A pull request keeps a version that was already released                     | CI fails                                                             |

## Not part of this task

- Any feature code: [articles-read-api](04-articles-read-api.md) starts the blog
- The admin token: [articles-write-api](05-articles-write-api.md)
- Deployment

## Words you might need

- **Template repository**: a GitHub repository marked as a template. “Use this template” copies its files into a new repository, without its history.
- **Container**: a small isolated system that runs one program with everything it needs. Here, one container runs the API and another runs PostgreSQL.
- **Image**: the recipe a container starts from, built from the `Dockerfile`.
- **Docker Compose**: a tool that starts several containers together, described in `compose.yaml`.
- **Migration**: a file with SQL that changes the database structure, applied in order.
- **Seed**: example data loaded into the database, so you have something to work with.
- **Swagger (OpenAPI)**: a standard description of an API, and a web page where you can try every endpoint.
- **CI (continuous integration)**: checks that run automatically on GitHub for every pull request.
- **Ruleset**: rules GitHub enforces on a branch, for example “only merge through a reviewed pull request”.
- **Semver**: `major.minor.patch` versions. Bump the minor version for features and the patch version for fixes.
- **Signed commit**: a commit with a cryptographic signature that proves who made it. GitHub shows it as “Verified”.

## Suggested steps

1. Install Docker and Git, and set up Git as in [first steps](https://github.com/gi-org-pl/gi-tech-standards/blob/main/docs/github/FIRST_STEPS.md), including commit signing.
2. Create the repository from the template, clone it, and start it as the template’s README says.
3. Run the checks in the container **before** you change anything, so you know any later failure is yours.
4. Make the project your own on a branch, and open your first pull request.
5. Protect `main` and invite your supervisors while CI runs.

If something goes wrong:

- **“Port is already allocated”** for `80` or `5432`: another program uses that port, often a local PostgreSQL or another Docker project.
- **Windows**: our projects are tested on Ubuntu and macOS. On Windows, use [WSL 2](https://learn.microsoft.com/windows/wsl/install) and keep the repository inside the WSL file system. Make sure Git does not turn line endings into CRLF, or the CI check will fail.
- **The app does not start**: read `docker compose logs app`.

## Standards to follow

- [Runtime](https://github.com/gi-org-pl/gi-tech-standards/blob/main/docs/backend/tools/RUNTIME.md): Docker for development, port `3000` in the container, Docker Compose to tie services together
- [Code owners](https://github.com/gi-org-pl/gi-tech-standards/blob/main/docs/backend/conventions/CODE_OWNERS.md): every server project has a `CODEOWNERS` file
- [Code quality](https://github.com/gi-org-pl/gi-tech-standards/blob/main/docs/backend/tools/CODE_QUALITY.md): run format and lint before you push
- [Git & GitHub: first steps](https://github.com/gi-org-pl/gi-tech-standards/blob/main/docs/github/FIRST_STEPS.md): signed commits
- Name your branch `chore/backend-repository-{{issue}}`, following [Conventional Branch](https://conventional-branch.github.io/)

## Depends on

Nothing. You can do [frontend-repository](02-frontend-repository.md) at the same time.

## Resources

- [nestjs-project-boilerplate](https://github.com/gi-org-pl/nestjs-project-boilerplate): the template
- [GitHub: creating a repository from a template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template)
- [GitHub: rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets)
- [GitHub: workflow token permissions](https://docs.github.com/en/actions/security-for-github-actions/security-guides/automatic-token-authentication)
- [Docker: get started](https://docs.docker.com/get-started/) and [Docker Compose](https://docs.docker.com/compose/)
- [NestJS: first steps](https://docs.nestjs.com/first-steps)
- [roadmap.sh: Docker](https://roadmap.sh/docker)

## Definition of Done

- [ ] Your API repository is public, in your account, and created with “Use this template”
- [ ] Someone who has never seen it can set it up and run it by following your README alone
- [ ] No template names are left (`git grep -i -e boilerplate -e generacja-innowacja` finds nothing)
- [ ] Nothing in the repository points at organisation teams or registries, and merging to `main` does not fail
- [ ] `main` is protected, and your supervisors are collaborators
- [ ] These pass in the container: `npm run format`, `npm run lint`, `npm run test:functional`, and CI is green
- [ ] All commits are signed

## Questions?

The parts that usually take the longest are Docker on a new machine and commit signing. If either stalls you for more than an hour, ask on your internship channel. Paste the exact error message, never your `.env` or your keys.

