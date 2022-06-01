# Rxofclock

[![MIT-LICENSE](https://img.shields.io/github/license/rexcape/rxofclock?style=for-the-badge)](https://github.com/rexcape/rxofclock/LICENSE)

[![Vercel](https://img.shields.io/badge/DEPLOYED%20WITH%20Vercel-000000.svg?style=for-the-badge&logo=Vercel&labelColor=000)](https://vercel.com)

Rxofclock is a useless tool for converting xlsx files into **any text** you need.

**WARNING: This tool is useless in most situations, only in specific situations can save a lot of time and repeat work.**

## Demo

This project is a SPA application, you can visit the [application page](https://rxofclock.vercel.app) for demo.

## Docs

See [rxofclock-docs](https://rxofclock-docs.vercel.app)

## Quick Start

enter the [application page](https://rxofclock.vercel.app)

example sheet

| fruit  | price |
| ------ | ----- |
| apple  | 10    |
| banana | 15    |

template

```handlebars
{{/each data}}
The price of {{[fruit]}} is {{[price]}}
{{#each}}
```

output

```text
The price of apple is 10
The price of banana is 15
```

## TODO

- [x] Basic features
- [x] Copy template and result
- [x] Download template and result
- [x] Load template from local text file
- [ ] Load code from url with fetch API, save recent urls
- [ ] Save and load code with localStorage
- [x] Register custom helpers
- [ ] Import online javascript libraries(such as [unpkg.com](https://unpkg.com)) in helper
- [ ] (Refactor) Split app.tsx into isolated components
- [ ] ~~Dark mode support~~

## Contributing

### Prerequisites

The project requires Nodejs >= 12 and PNPM >= 6

### Development

Clone this repo

```sh
git clone https://github.com/rexcape/rxofclock.git

cd rxofclock
```

Install dependencies

```sh
pnpm install
```

Run dev server

```sh
pnpm dev
```

## Acknowledgements

Thanks Vercel for hosting this page.

This README.md was written with [readme.so](https://readme.so/)
