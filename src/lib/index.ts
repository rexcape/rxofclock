export const getTemplate = (content: string) =>
  `{{#each data}}\n${content}\n{{/each}}`
