# Blog section

> Show your articles on the about me page, read from your API, with loading, empty and error states.

> 💬 **Stuck or unsure?** Ask on your internship channel. Ask early, even before you have code to show.

## Story

As a visitor of the about me page, I want to see the author’s articles, newest first, so that I can find out what they write about.

## Why we are doing this

This is where your two repositories meet. The page asks your API for the articles, checks that the answer looks right, and shows it.

Real networks are slow and APIs fail, so a component that shows remote data has more to handle than the data itself: the wait, an empty list, an error and an answer in the wrong shape. Each of them is a state your page must show on purpose, never by accident.

## What you will build

A blog section on your about me page, with the articles from your API, newest first. Each article shows at least its title and its date. What else it shows, how it looks, and how you split it into components is up to you.

### Requirements

- API calls follow our [API communication standard](https://github.com/gi-org-pl/gi-tech-standards/blob/main/docs/frontend/tools/API_COMMUNICATION.md): an Axios client in `src/services/`, never Axios inside a component.
- Every answer from the API is checked with a **Zod** schema. An answer that does not match counts as an error.
- The address of the API is not hardcoded in components, and can be changed without changing code. Your README says how.
- Every state from “How it should behave” has a Storybook story and unit tests.
- The happy path has an end-to-end test that runs in CI. CI does not run your API, so the test cannot depend on it.

## How it should behave

Each row below should become at least one test.

| Situation                                                | What the page does                                                |
| -------------------------------------------------------- | ----------------------------------------------------------------- |
| The articles are loading                                 | The visitor can see that they are loading                         |
| The API answers with articles                            | Every article, newest first, with at least its title and date     |
| The API answers with no articles                         | A message that there are no articles yet                          |
| The API is down, answers with an error, or never answers | An error message and a way to try again                           |
| The answer does not match the schema                     | The same error. Never show half of a broken answer                |
| The visitor tries again                                  | The articles are loaded again                                     |
| The articles are loading or have failed                  | The rest of the page works normally. The blog never holds it back |
| The visitor leaves the page before the answer arrives    | No errors or warnings in the browser console                      |
| A very long title                                        | It wraps, and never makes the page scroll sideways                |

## Not part of this task

- Opening an article: [article-page](07-article-page.md)
- Pagination and caching
- Writing articles from the front end

## Words you might need

- **Schema**: a description of what data must look like. Zod checks data against it at runtime and tells you if it does not match.
- **`z.infer`**: makes a TypeScript type out of a Zod schema, so you write the shape only once.
- **Hook**: a function whose name starts with `use` and that can use React state and effects.
- **Timeout**: how long to wait for an answer before giving up.
- **CORS**: a browser rule that blocks a page from calling an API on another address, unless the API allows it. The Nest.js template already allows `http://localhost:5173` in development.
- **Mock**: a fake version of something, such as the API, used in a test.

## Suggested steps

1. Start your API and open its list endpoint in the browser. That is the data you will show.
2. Write the schema first, and try it on the real answer.
3. Build the API client, then the section, with tests and a story for every state.
4. With both projects running, check every state by hand. Stopping the API is the easiest way to see the error.
5. Write the end-to-end test.

## Standards to follow

- [API communication](https://github.com/gi-org-pl/gi-tech-standards/blob/main/docs/frontend/tools/API_COMMUNICATION.md): Axios for requests, Zod for every answer
- [Project structure](https://github.com/gi-org-pl/gi-tech-standards/blob/main/docs/frontend/conventions/PROJECT_STRUCTURE.md), [component structure](https://github.com/gi-org-pl/gi-tech-standards/blob/main/docs/frontend/conventions/COMPONENT_STRUCTURE.md) and [naming](https://github.com/gi-org-pl/gi-tech-standards/blob/main/docs/frontend/conventions/NAMING.md)
- [State management](https://github.com/gi-org-pl/gi-tech-standards/blob/main/docs/frontend/tools/STATE_MANAGEMENT.md): start with React’s own state, and reach for Zustand only when the standard says so
- [Testing](https://github.com/gi-org-pl/gi-tech-standards/blob/main/docs/frontend/tools/TESTING.md) and the [testing convention](https://github.com/gi-org-pl/gi-tech-standards/blob/main/docs/frontend/conventions/TESTING_CONVENTION.md): at least 95% coverage of the code you change, a Playwright test for the happy path
- Style with Tailwind and Athena, with colours from the palette
- No `any` and no `@ts-ignore`
- Name your branch `feature/blog-section-{{issue}}`, following [Conventional Branch](https://conventional-branch.github.io/)

## Depends on

- [about-me-page](03-about-me-page.md): the page the section goes on
- [articles-read-api](04-articles-read-api.md): the endpoint it reads

You can work on [articles-write-api](05-articles-write-api.md) at the same time.

## Resources

- [Axios](https://axios-http.com/docs/intro) and [Zod](https://zod.dev/)
- [React: synchronizing with effects](https://react.dev/learn/synchronizing-with-effects)
- [React Router: data loading](https://reactrouter.com/start/framework/data-loading)
- [Vitest: mocking](https://vitest.dev/guide/mocking)
- [Playwright: mock APIs](https://playwright.dev/docs/mock)
- [Vite: environment variables](https://vite.dev/guide/env-and-mode)

## Definition of Done

- [ ] With both projects running, the about me page shows your articles from the database, newest first
- [ ] It behaves as described in every row of “How it should behave”
- [ ] No component imports Axios, and every answer from the API goes through a Zod schema
- [ ] The API address can be changed without changing code, and your README says how
- [ ] Unit tests in Given / When / Then style cover at least 95% of the code you changed
- [ ] Every state has a Storybook story
- [ ] The Playwright happy path passes locally and in CI
- [ ] `yarn lint` is clean and TypeScript has no errors
- [ ] CI is green: build, unit tests, lint and e2e

## Questions?

The part that usually takes the longest is testing the loading and error states. If it stalls you, ask on your internship channel. A draft pull request with only the schema, the API client and their tests is a good first thing to show.

