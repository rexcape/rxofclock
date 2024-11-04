import Editor, { OnChange } from '@monaco-editor/react'
import { Box, Loader, Textarea, useMantineTheme } from '@mantine/core'
import { useAtomValue } from 'jotai'
import { lowPerformanceModeAtom } from '@/store'

export interface HelperEditorProps {
  value: string
  onChange: (s: string) => void
}

export const HelperEditor = (props: HelperEditorProps) => {
  const { value, onChange } = props

  const active = useAtomValue(lowPerformanceModeAtom)
  const theme = useMantineTheme()

  const handleChange: OnChange = (val) => {
    onChange(val || '')
  }

  return (
    <Box>
      {active ? (
        <Textarea
          rows={10}
          ff="monospace"
          onChange={(e) => onChange(e.target.value ?? '')}
          value={value}
        />
      ) : (
        <Editor
          className="code-editor rounded"
          defaultLanguage="javascript"
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
    </Box>
  )
}
