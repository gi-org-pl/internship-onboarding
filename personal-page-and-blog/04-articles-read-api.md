# Articles read API

> Store your blog articles in PostgreSQL, and add public endpoints that list them and return one.

> 💬 **Stuck or unsure?** Ask on your internship channel. Ask early, even before you have code to show.

## Story

As a visitor of the about me page, I want the API to list the blog articles and return any one of them, so that the page can show them.

## Why we are doing this

This is your first feature on the back end, and it touches every layer: a database table and its migration, seed data, a module split into layers, queries, an HTTP endpoint, Swagger documentation and functional tests.

You only build reading here. Writing articles comes in [articles-write-api](05-articles-write-api.md). Until then, your articles come from the seed data.

## What you will build

- **Articles in the database.** A table created by a Prisma migration. You decide what an article holds, but your blog needs at least a title, the text and a publication date.
- **Seed data** with a few example articles, so there is something to show and to test against.
- **Two public endpoints**: one that lists the articles, newest first, and one that returns a single article by its ID. You design the paths and what they answer. Your front end will be the one using them. Our APIs keep a version in the path, such as `/api/v1/...`.
- **An `articles` module split into layers**, as our [structure convention](https://github.com/gi-org-pl/gi-tech-standards/blob/main/docs/backend/conventions/STRUCTURE.md) recommends: `model` for the domain, `application` for queries (and later commands), and `infra` for HTTP and the database. Reads go through queries (CQRS), as in our production APIs. The template does not include `@nestjs/cqrs` yet.
- **Swagger documentation** for both endpoints, with every response code they can give.

### Heads-up: things in the template you will run into

- The dev entrypoint runs the seed **every time the container starts**, not only once. Your seed must cope with articles that are already there.
- The template’s schema has an example `User` model you do not need.
- The template’s `Given I use seed data` step does not work with Prisma 7: it fails with `unknown or unexpected option: --skip-generate`. Fix it, and make sure that after the step the database holds exactly your seed data. Check what `prisma migrate reset` does in Prisma 7 before you rely on it.
- Tests and seeds run with ts-node, which does not understand `src/...` imports. Files they import need relative imports.

## How it should behave

Each row below should become at least one test scenario.

| Situation                                               | What the API does                                                        |
| ------------------------------------------------------- | ------------------------------------------------------------------------ |
| Listing, with articles in the database                  | `200`, every article, newest first                                       |
| Listing, with two articles published at the same moment | The same order on every call                                             |
| Listing, with no articles                               | `200`, an empty list                                                     |
| One article that exists                                 | `200`, the whole article                                                 |
| One article, an ID that does not exist                  | `404`, with a message that says so                                       |
| One article, an ID that is not a valid ID at all        | `400`                                                                    |
| The app is restarted several times                      | It starts cleanly every time, and the seed articles are never duplicated |

## Not part of this task

- Creating, editing and deleting articles: [articles-write-api](05-articles-write-api.md)
- Pagination, search and filters
- Calling the API from the front end: [blog-section](06-blog-section.md)

## Words you might need

- **Migration**: a file with SQL that changes the database structure. Migrations are applied in order, and an applied migration is never edited: you add a new one instead.
- **Seed**: example data loaded into the database, so you have something to work with and to test against.
- **UUID**: a random 128-bit ID, such as `5e1f0a2b-0001-4000-8000-000000000001`. Anyone can generate one without asking the database.
- **CQRS** (command query responsibility segregation): writes (commands) and reads (queries) are separate classes, each with one handler.
- **Repository**: the class that talks to the database for one kind of data.
- **DTO** (data transfer object): a class that describes what goes into or out of the API.
- **Idempotent**: safe to run many times with the same result.

## Suggested steps

1. Read the [structure](https://github.com/gi-org-pl/gi-tech-standards/blob/main/docs/backend/conventions/STRUCTURE.md) and [naming](https://github.com/gi-org-pl/gi-tech-standards/blob/main/docs/backend/conventions/NAMING.md) conventions.
2. Design the table, create the migration, and read the SQL Prisma generated: you should understand every line.
3. Write the seed, and restart the app a few times to see that it copes.
4. Fix the seed step in the tests.
5. Build the module, try the endpoints in Swagger UI, and write the functional tests.

## Standards to follow

- [Structure](https://github.com/gi-org-pl/gi-tech-standards/blob/main/docs/backend/conventions/STRUCTURE.md): the `application`, `infra` and `model` layers, and a plural module name
- [Naming](https://github.com/gi-org-pl/gi-tech-standards/blob/main/docs/backend/conventions/NAMING.md): file names, named exports only, `function` for named functions, feature files named `<action>.<domain>.feature`, and scenario names as user stories that never repeat in a file
- [Runtime](https://github.com/gi-org-pl/gi-tech-standards/blob/main/docs/backend/tools/RUNTIME.md): PostgreSQL through Prisma 7, client in `prisma/client/`
- Every row of “How it should behave” has a Cucumber scenario
- Run every `npm` and `npx` command inside the container
- Bump the minor version in `package.json`, and refresh `package-lock.json` in the container
- Name your branch `feature/articles-read-api-{{issue}}`, following [Conventional Branch](https://conventional-branch.github.io/)

## Depends on

[backend-repository](01-backend-repository.md). You can work on [about-me-page](03-about-me-page.md) at the same time.

## Resources

- [NestJS: modules](https://docs.nestjs.com/modules), [controllers](https://docs.nestjs.com/controllers) and [CQRS](https://docs.nestjs.com/recipes/cqrs)
- [NestJS: OpenAPI (Swagger)](https://docs.nestjs.com/openapi/introduction)
- [Prisma: data model](https://www.prisma.io/docs/orm/prisma-schema/data-model/models), [migrations](https://www.prisma.io/docs/orm/prisma-migrate/getting-started) and [seeding](https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding)
- [Cucumber: Gherkin reference](https://cucumber.io/docs/gherkin/reference/)
- [roadmap.sh: back end](https://roadmap.sh/backend)

## Definition of Done

- [ ] Both endpoints behave as described in every row of “How it should behave”, and each row has a functional scenario
- [ ] Articles live in a table created by a migration
- [ ] The seed data loads example articles, and the app starts cleanly many times in a row
- [ ] `Given I use seed data` leaves the database with exactly the seed data
- [ ] The module is split into `model`, `application` and `infra`, and reads go through queries
- [ ] Swagger documents both endpoints and every response code
- [ ] These pass in the container: `npm run format`, `npm run lint`, `npm run test:functional`, and CI is green
- [ ] The version in `package.json` is bumped

## Questions?

The part that usually takes the longest is the first migration, and understanding why the seed runs on every start. If either one stalls you, ask on your internship channel. A draft pull request with only the table, the migration and the seed is a good first thing to show.

