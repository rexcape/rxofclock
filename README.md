# Rxofclock

[![MIT-LICENSE](https://img.shields.io/github/license/rexcape/rxofclock?style=for-the-badge)](https://github.com/rexcape/rxofclock/LICENSE)

[![Vercel](https://img.shields.io/badge/DEPLOYED%20BY%20Vercel-000000.svg?style=for-the-badge&logo=Vercel&labelColor=000)](https://vercel.com)

Rxofclock is a useless tool for converting xlsx files into **any text** you need.

**WARNING: This tool is useless in most situations, only in specific situations can save a lot of time and repeat work.**

## Docs

See [rxofclock-docs](https://rxofclock-docs.vercel.app)

## Quick Start

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
- [ ] Save and load templates into localStorage
- [ ] Register custom helpers

## Contributing

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

Thanks Vercel for hosting this page free of charge. Vercel deployment is free for hobby.
