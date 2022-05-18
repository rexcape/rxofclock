import Editor, { OnChange } from '@monaco-editor/react'

export interface TemplateEditorProps {
  defaultVal: string
  onChange: (s: string) => void
}

export const TemplateEditor = (props: TemplateEditorProps) => {
  const { defaultVal, onChange } = props

  const handleChange: OnChange = (val) => {
    onChange(val || '')
  }

  return (
    <Editor
      className={'p-1 px-4 border border-base-300 rounded-lg'}
      defaultLanguage={'handlebars'}
      defaultValue={defaultVal}
      onChange={handleChange}
      options={{
        tabSize: 2,
        minimap: {
          enabled: false,
        },
      }}
      loading={<progress className={'progress w-56'} />}
    />
  )
}
