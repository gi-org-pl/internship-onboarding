# Article page

> Open an article from the blog section on its own page, and read it whole.

> 💬 **Stuck or unsure?** Ask on your internship channel. Ask early, even before you have code to show.

## Story

As a visitor of the about me page, I want to open an article from the blog section and read all of it, so that I get more than the list shows.

## Why we are doing this

The blog section shows only the list. This task adds the second page of your app, with its own address, and the second endpoint your front end calls. It is also the first time the address in the browser decides what the page shows, and the first time a visitor can ask for something that does not exist.

## What you will build

A page for a single article, with its own address, so it can be bookmarked and shared. The visitor gets there from the blog section, and can get back to the about me page. The page shows the whole article. What it shows besides the text, and how it looks, is up to you.

### Requirements

- Going from the blog section to an article does not reload the whole app.
- Article content can **never** run a script on your page, whatever it contains.
- The same API rules as in [blog-section](06-blog-section.md): an Axios client in `src/services/`, and every answer checked with Zod.
- Every state from “How it should behave” has a Storybook story and unit tests.
- The happy path, from the about me page to an article and back, has an end-to-end test that runs in CI.

## How it should behave

Each row below should become at least one test.

| Situation                                                      | What the page does                                                          |
| -------------------------------------------------------------- | --------------------------------------------------------------------------- |
| A visitor picks an article in the blog section                 | The article’s page opens, scrolled to the top                               |
| The article is loading                                         | The visitor can see that it is loading                                      |
| The API answers with the article                               | The whole article, with its paragraphs kept                                 |
| The content contains HTML, such as `<script>` or `<b>`         | Nothing in it runs. The visitor sees the text, never a working script       |
| The article does not exist, or the address has an invalid ID   | A message that the article does not exist, and a way back                   |
| The API is down, answers with an error, or with a wrong shape  | An error message and a way to try again                                     |
| The visitor uses the browser’s Back button                     | They are back on the about me page                                          |
| The visitor opens an article address directly, from a bookmark | The article loads, without visiting the about me page first                 |
| The visitor goes from one article to another                   | The new article loads, and the old one is never shown under the new address |

## Not part of this task

- A page that lists every article
- Comments, images or Markdown in articles
- Links to the previous and next article

## Words you might need

- **Route parameter**: a variable part of an address, like the article’s ID in `/articles/123`.
- **Client-side navigation**: changing the page without asking the server for a new HTML document.
- **XSS** (cross-site scripting): an attack where someone gets their script to run on your page, often through text that the page renders as HTML.
- **Deep link**: an address that points straight to something inside an app, like one article.

## Suggested steps

1. Read how React Router turns files in `src/pages/` into pages with parameters.
2. Make the page open for any ID, then load the article.
3. Handle every state from “How it should behave”, with tests and stories.
4. Link the blog section to the page.
5. With both projects running, try every row by hand, including an address with a made-up ID.
6. Write the end-to-end test.

## Standards to follow

- [Project structure](https://github.com/gi-org-pl/gi-tech-standards/blob/main/docs/frontend/conventions/PROJECT_STRUCTURE.md), [component structure](https://github.com/gi-org-pl/gi-tech-standards/blob/main/docs/frontend/conventions/COMPONENT_STRUCTURE.md) and [naming](https://github.com/gi-org-pl/gi-tech-standards/blob/main/docs/frontend/conventions/NAMING.md)
- [API communication](https://github.com/gi-org-pl/gi-tech-standards/blob/main/docs/frontend/tools/API_COMMUNICATION.md): Axios for requests, Zod for every answer
- [Testing](https://github.com/gi-org-pl/gi-tech-standards/blob/main/docs/frontend/tools/TESTING.md) and the [testing convention](https://github.com/gi-org-pl/gi-tech-standards/blob/main/docs/frontend/conventions/TESTING_CONVENTION.md): at least 95% coverage of the code you change, a Playwright test for the happy path
- Style with Tailwind and Athena, with colours from the palette
- No `any` and no `@ts-ignore`
- A new dependency, for example to render Markdown, needs approval from the Technical Leader
- Name your branch `feature/article-page-{{issue}}`, following [Conventional Branch](https://conventional-branch.github.io/)

## Depends on

[blog-section](06-blog-section.md): the API client and the list to link from.

## Resources

- [React Router: file route conventions](https://reactrouter.com/how-to/file-route-conventions)
- [React Router: navigating](https://reactrouter.com/start/framework/navigating) and [`ScrollRestoration`](https://reactrouter.com/api/components/ScrollRestoration)
- [React Router: testing](https://reactrouter.com/start/framework/testing)
- [OWASP: cross-site scripting](https://owasp.org/www-community/attacks/xss/)
- [Playwright: mock APIs](https://playwright.dev/docs/mock)

## Definition of Done

- [ ] Every article opens on its own page from the blog section, and Back returns to the about me page
- [ ] The page behaves as described in every row of “How it should behave”
- [ ] Article content can never run a script on the page
- [ ] Unit tests in Given / When / Then style cover at least 95% of the code you changed
- [ ] Every state has a Storybook story
- [ ] The Playwright happy path passes locally and in CI
- [ ] `yarn lint` is clean and TypeScript has no errors
- [ ] CI is green: build, unit tests, lint and e2e

## Questions?

The part that usually takes the longest is loading a new article when only the ID in the address changes. If it stalls you, ask on your internship channel. When this task is merged, the milestone is done: show it to your mentors!

