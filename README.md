# Kanban Task Management

Exploring Vue 3, Naive UI, Pinia, and Tailwind CSS by building kanban task management like Trello.

## Features
- Vue 3 + Composition API
- Vue Router
- Pinia State Management
- Naive UI for Custom Component
- Tailwind CSS for Utility Class
- Mock API with Axios
- Draggable Cards

## Login information
```
email: user@example.com
password: user
```
## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.


## Project Installation

```sh
yarn

# or with npm
npm run install
```

### Compile and Hot-Reload for Development

```sh
yarn dev

# or with npm
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build

# or with npm
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint

# or with npm
npm run lint
```
