import _ from 'lodash'

export const getTemplate = (content: string) =>
  `{{#each data}}\n${content}\n{{/each}}`

export const registerGlobal = () => {
  globalThis._ = _
}
