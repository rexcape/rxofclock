import Editor, { OnChange } from '@monaco-editor/react'
import { useAtomValue } from 'jotai'
import { lowPerformanceModeAtom } from '@/store'
import { Loader, Textarea, useMantineTheme } from '@mantine/core'

export interface TemplateEditorProps {
  value: string
  onChange: (s: string) => void
}

export const TemplateEditor = (props: TemplateEditorProps) => {
  const { value, onChange } = props

  const active = useAtomValue(lowPerformanceModeAtom)
  const theme = useMantineTheme()

  const handleChange: OnChange = (val) => {
    onChange(val || '')
  }

  return (
    <>
      {active ? (
        <Textarea
          radius="none"
          rows={15}
          onChange={(e) => onChange(e.target.value ?? '')}
          value={value}
        />
      ) : (
        <Editor
          className="code-editor inline"
          defaultLanguage="handlebars"
          value={value}
          onChange={handleChange}
          options={{
            tabSize: 2,
            minimap: {
              enabled: false,
            },
            fontSize: 16,
            fontFamily: theme.fontFamilyMonospace,
          }}
          loading={<Loader />}
        />
      )}
    </>
  )
}
