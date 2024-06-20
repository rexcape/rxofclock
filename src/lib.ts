import { camelCase, snakeCase } from 'lodash-es'

export const getTemplate = (content: string) =>
  `{{#each data}}\n${content}\n{{/each}}`

export const registerGlobal = () => {
  globalThis._.camelCase = camelCase
  globalThis._.snakeCase = snakeCase
}
