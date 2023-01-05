import Editor, { OnChange } from '@monaco-editor/react'
import { Ring } from '@uiball/loaders'

export interface TemplateEditorProps {
  value: string
  onChange: (s: string) => void
}

export const TemplateEditor = (props: TemplateEditorProps) => {
  const { value, onChange } = props

  const handleChange: OnChange = (val) => {
    onChange(val || '')
  }

  return (
    <div className="h-80">
      <Editor
        className="p-1 px-4"
        defaultLanguage="handlebars"
        value={value}
        onChange={handleChange}
        options={{
          tabSize: 2,
          minimap: {
            enabled: false,
          },
          fontSize: 16,
        }}
        loading={<Ring size={40} lineWeight={5} speed={2} color="black" />}
      />
    </div>
  )
}
