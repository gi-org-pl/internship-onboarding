# About me page

> Build your personal page, a little about who you are, styled with Tailwind.

> 💬 **Stuck or unsure?** Ask on your internship channel. Ask early, even before you have code to show.

## Story

As a visitor, I want to read a short page about the author, so that I know who they are.

## Why we are doing this

This is your first real user interface. The page is simple on purpose, so you can focus on how we build front ends: components that follow our structure, Tailwind for styling, Athena for ready-made parts, and tests and stories for everything you build.

## What you will build

A personal page at the home address of your app. What you put on it is up to you: who you are, what you enjoy doing, what interests you, what you have already built, how to reach you. It can be real or made up. We do not grade the content, and we do not publish it.

There is no design to follow. You design the page yourself, and you decide how to split it into components.

Your repository is public, so put nothing on the page that you would not want strangers to see, such as a phone number or a home address.

### Requirements

- Style the page with **Tailwind**. Use Athena components where they fit, and do not restyle them.
- Use colours from the palette only: Athena’s theme and Tailwind’s own colours, never colours written by hand.
- The page works on a phone and on a wide screen.
- Every component you write has unit tests and a Storybook story.
- The page has an end-to-end test of its happy path, and it runs in CI.

### Heads-up: end-to-end tests in the template

The template ships with Playwright, but it has never been used for real:

- `playwright.config.ts` has no base URL and does not start your app.
- The end-to-end job in CI is switched off (`if: false`). It also starts the app before installing the dependencies, and uploads the report from `/playwright-report/`, while Playwright writes it to `playwright-report/` in the project folder.

Getting it to run, on your machine and in CI, is part of this task.

## How it should behave

Each row below should become at least one test.

| Situation                     | What the page does                                                         |
| ----------------------------- | -------------------------------------------------------------------------- |
| A visitor opens the home page | Shows your page, with your name as its main heading                        |
| A phone screen, 360 px wide   | Everything is readable, and the page never scrolls sideways                |
| A wide screen, 1440 px        | The content stays at a comfortable reading width                           |
| A very long name or word      | It wraps onto the next line instead of overflowing                         |
| A keyboard user presses Tab   | Every link and button can be reached, in reading order, with visible focus |
| An image                      | It has a text alternative, or is marked as decorative                      |

## Not part of this task

- The blog: [blog-section](06-blog-section.md)
- Other pages: [article-page](07-article-page.md) adds the first one
- Translations
- Putting the page online

## Words you might need

- **Props**: the inputs of a React component, like the arguments of a function.
- **Domain**: a part of the app that belongs together. Our project structure groups components by domain.
- **Heading levels** (`h1`, `h2`, …): they give the page an outline. Screen readers and search engines use it to understand the page.
- **Responsive**: a layout that adapts to the screen size. Tailwind does it with prefixes such as `md:` and `lg:`.
- **Focus**: the element the keyboard is on. It must always be visible.
- **Coverage**: how much of your code the unit tests run.

## Suggested steps

1. Sketch the page on paper: what goes where, on a phone and on a wide screen.
2. Read the [project structure](https://github.com/gi-org-pl/gi-tech-standards/blob/main/docs/frontend/conventions/PROJECT_STRUCTURE.md), [component structure](https://github.com/gi-org-pl/gi-tech-standards/blob/main/docs/frontend/conventions/COMPONENT_STRUCTURE.md) and [naming](https://github.com/gi-org-pl/gi-tech-standards/blob/main/docs/frontend/conventions/NAMING.md) conventions.
3. Look through [Athena’s components](https://github.com/gi-org-pl/athena/tree/main/src/components/ui) and what they accept as props.
4. Build one component at a time, with its test and its story.
5. Check the page at different widths with your browser’s device toolbar.
6. Set up the end-to-end test and its CI job.

## Standards to follow

- [Project structure](https://github.com/gi-org-pl/gi-tech-standards/blob/main/docs/frontend/conventions/PROJECT_STRUCTURE.md), [component structure](https://github.com/gi-org-pl/gi-tech-standards/blob/main/docs/frontend/conventions/COMPONENT_STRUCTURE.md) and [naming](https://github.com/gi-org-pl/gi-tech-standards/blob/main/docs/frontend/conventions/NAMING.md)
- [Testing](https://github.com/gi-org-pl/gi-tech-standards/blob/main/docs/frontend/tools/TESTING.md) and the [testing convention](https://github.com/gi-org-pl/gi-tech-standards/blob/main/docs/frontend/conventions/TESTING_CONVENTION.md): unit tests in Given / When / Then style, at least 95% coverage of the code you change, a Playwright test for the happy path
- Use the standard colour palette, never colours written directly (see [Tailwind colours](https://tailwindcss.com/docs/colors) and [Athena’s theme](https://github.com/gi-org-pl/athena/blob/main/src/index.css))
- Write a Storybook story for every component, with every variant of its props
- No `any` and no `@ts-ignore`
- Name your branch `feature/about-me-page-{{issue}}`, following [Conventional Branch](https://conventional-branch.github.io/)

## Depends on

[frontend-repository](02-frontend-repository.md). You can work on [articles-read-api](04-articles-read-api.md) at the same time.

## Resources

- [Athena](https://github.com/gi-org-pl/athena): our component library
- [Tailwind CSS](https://tailwindcss.com/docs): start with [responsive design](https://tailwindcss.com/docs/responsive-design) and [colours](https://tailwindcss.com/docs/colors)
- [React: describing the UI](https://react.dev/learn/describing-the-ui)
- [Testing Library: which query should I use?](https://testing-library.com/docs/queries/about#priority)
- [Storybook: how to write stories](https://storybook.js.org/docs/writing-stories)
- [Playwright: getting started](https://playwright.dev/docs/intro) and [web server](https://playwright.dev/docs/test-webserver)
- [MDN: accessibility basics](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility)

## Definition of Done

- [ ] The home page of your app is your personal page
- [ ] It behaves as described in every row of “How it should behave”
- [ ] It is styled with Tailwind and Athena, with colours from the palette only
- [ ] Code follows the project structure, the component structure and the naming conventions
- [ ] Unit tests in Given / When / Then style cover at least 95% of the code you changed
- [ ] Every component has a Storybook story with all its variants
- [ ] The Playwright happy path passes locally and in CI
- [ ] `yarn lint` is clean and TypeScript has no errors
- [ ] CI is green: build, unit tests, lint and e2e

## Questions?

The end-to-end job in CI is the part most likely to fail for reasons outside your code. If it is still red after an hour, ask on your internship channel. A draft pull request with your first component, its test and its story is a good first thing to show.

