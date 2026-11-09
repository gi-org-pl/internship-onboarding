# Articles write API

> Add endpoints to create, edit and delete articles, protected by an admin token.

> 💬 **Stuck or unsure?** Ask on your internship channel. Ask early, even before you have code to show.

## Story

As the author of the blog, I want to create, edit and delete my articles through the API, and I want nobody else to be able to, so that I can keep my blog up to date without touching the database.

## Why we are doing this

Right now, the only way to add an article is to edit the seed data. This task gives you real write endpoints, and with them three things every API needs: checking what comes in, checking who is asking, and answering with the right status code when something is wrong.

You will not build a form for this in the front end. Swagger UI is your admin panel: it can send the token for you.

## What you will build

- **Endpoints to create, edit and delete an article.** You design them: the paths, the methods, the request bodies and the answers.
- **Admin only.** Only a request with the admin token may write. Reading stays open to everyone. The template’s `AdminGuard` checks a bearer token against the `ADMIN_TOKEN` setting.
- **Validation.** You decide the rules for each field, such as the shortest and longest title, and document them in Swagger. Anything that breaks them gets a `400` with the template’s list of `violations`.
- **The server owns some fields.** The ID and the publication date are set by the API, never sent by the client.
- **Writes through commands** (CQRS), next to the queries from the previous task.
- **Swagger UI as your admin panel**: the **Authorize** button sends the token, and you can manage your articles from there.

### Heads-up: things in the template you will run into

- `.env.dist` has no `ADMIN_TOKEN` yet. The test step `Given I use admin token` sends `admin-token`.
- `AdminGuard` reads the token through `ConfigService`, which the template’s `AppModule` does not provide yet.
- The test context resets the token to `null` after every scenario, and then still sends `Authorization: Bearer null`. A test “without a token” gets `403` instead of `401`. You will need steps for “no token” and “a wrong token”.
- The template’s Swagger config names its bearer scheme `access-token`.

## How it should behave

Each row below should become at least one test scenario.

| Situation                                                      | What the API does                                              |
| -------------------------------------------------------------- | -------------------------------------------------------------- |
| Create, with valid data                                        | `201`, the new article. It then shows up in the list           |
| Create or edit, with data that breaks a rule                   | `400`, with a violation on each wrong field                    |
| Create or edit, with fields the server owns, or unknown fields | `400`                                                          |
| Edit an article that exists                                    | The changes are saved, and the publication date stays the same |
| Edit or delete, an ID that does not exist                      | `404`                                                          |
| Edit or delete, an ID that is not a valid ID                   | `400`                                                          |
| Delete an article that exists                                  | Success. Reading it afterwards gives `404`                     |
| Any write, without a token                                     | `401`                                                          |
| Any write, with a wrong token                                  | `403`                                                          |
| Any write, without a token **and** with invalid data           | `401`. A stranger learns nothing about your rules              |
| Reading, without a token                                       | Still works, as before                                         |

## Not part of this task

- A form or an admin page in the front end
- User accounts, sign-in, or more than one token
- Drafts and scheduling articles for later
- Showing articles in the front end: [blog-section](06-blog-section.md)

## Words you might need

- **Guard**: a class that decides, before your handler runs, whether a request may go on.
- **Bearer token**: a secret sent in the `Authorization: Bearer <token>` header. Whoever “bears” it gets in.
- **`401 Unauthorized`**: “I do not know who you are”: no token at all. **`403 Forbidden`**: “I know, and you may not”: a token that is wrong.
- **`201 Created`** and **`204 No Content`**: success, with a new resource in the body, or with no body at all.
- **`PUT` and `PATCH`**: `PUT` replaces the whole resource, `PATCH` changes only the fields you send. Pick the one that fits your design.
- **Pipe**: in Nest, a class that checks or changes the input before the handler gets it, like the validation pipe.

## Suggested steps

1. Make the guard work: the token setting, the configuration, and the test steps for no token and a wrong token.
2. Build one endpoint at a time, and try each in Swagger UI with the **Authorize** button.
3. Write the functional tests as you go.

## Standards to follow

- [Structure](https://github.com/gi-org-pl/gi-tech-standards/blob/main/docs/backend/conventions/STRUCTURE.md) and [naming](https://github.com/gi-org-pl/gi-tech-standards/blob/main/docs/backend/conventions/NAMING.md), as in the previous task
- Changes go through commands, reads go through queries
- Document every endpoint in Swagger: a summary, every response code and the token
- Every row of “How it should behave” has a Cucumber scenario
- Never commit a real secret. A local development value in `.env.dist` is fine, a real one never is
- Never write the token to a log or an error message
- Bump the minor version in `package.json`, and refresh `package-lock.json` in the container
- Name your branch `feature/articles-write-api-{{issue}}`, following [Conventional Branch](https://conventional-branch.github.io/)

## Depends on

[articles-read-api](04-articles-read-api.md). You can work on [blog-section](06-blog-section.md) at the same time.

## Resources

- [NestJS: guards](https://docs.nestjs.com/guards), [validation](https://docs.nestjs.com/techniques/validation) and [configuration](https://docs.nestjs.com/techniques/configuration)
- [NestJS: CQRS, commands](https://docs.nestjs.com/recipes/cqrs#commands)
- [class-validator decorators](https://github.com/typestack/class-validator#validation-decorators)
- [MDN: HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status)
- [Prisma: CRUD](https://www.prisma.io/docs/orm/prisma-client/queries/crud)

## Definition of Done

- [ ] Creating, editing and deleting behave as described in every row of “How it should behave”, and each row has a functional scenario
- [ ] Reading articles still works without a token
- [ ] A test without a token gets `401`, and a test with a wrong token gets `403`
- [ ] You can create, edit and delete an article in Swagger UI with the **Authorize** button
- [ ] No real secret is committed
- [ ] These pass in the container: `npm run format`, `npm run lint`, `npm run test:functional`, and CI is green
- [ ] The version in `package.json` is bumped

## Questions?

The part that usually takes the longest is the difference between `401` and `403`, and why the template’s test context gets it wrong. If it stalls you, ask on your internship channel. A draft pull request with only the create endpoint and its scenarios is a good first thing to show.

