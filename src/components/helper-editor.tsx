import { useContext } from 'react'
import Editor, { OnChange } from '@monaco-editor/react'
import { Ring } from '@uiball/loaders'
import { LowPerformanceMode } from '@/contexts'

export interface HelperEditorProps {
  value: string
  onChange: (s: string) => void
}

export const HelperEditor = (props: HelperEditorProps) => {
  const { value, onChange } = props

  const { active } = useContext(LowPerformanceMode)

  const handleChange: OnChange = (val) => {
    onChange(val || '')
  }

  return (
    <>
      <div className="h-80">
        {active ? (
          <textarea
            className="textarea textarea-bordered w-full h-80 font-mono resize-none"
            onChange={(e) => onChange(e.target.value ?? '')}
            value={value}
          />
        ) : (
          <Editor
            className="p-1 px-4 border border-base-300 rounded-lg"
            defaultLanguage="javascript"
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
        )}
      </div>
    </>
  )
}
