# @jman.me/create-react-app
[![npm version](https://badge.fury.io/js/%40jman.me%2Fcreate-react-app.svg)](https://badge.fury.io/js/%40jman.me%2Fcreate-react-app)

This is an opinionated generation library which is based on create-react-app. All data is generated on runtime to ensure that everything is up to date when you generate your project.

Decisions made:
* Typescript
* mobx
* styled-components
* tailwind.css
* normalize.css
* Prettier
  * printWidth: 110
* ESLint
  * jsx-a11y/anchor-is-valid: off
  * @typescript-eslint/no-unused-vars: off
* TSConfig
  * experimentalDecorators: true
  * baseUrl: "."
  * noImplicitReturns: true
* react-helmet
* Project structure
  * src/layout
  * src/pages
  * src/state
  * src/utils
  * src/styles
  * src/app.tsx
  * src/index.tsx

## Usage
```npx @jman.me/create-react-app [my-project]```
