import { useState, FC } from 'react'
import { HelperEditor } from '@/components'
import { Stack, Switch, Title } from '@mantine/core'

export interface CustomHelperProps {
  helper: string
  setHelper: (val: string) => any
}

export const CustomHelper: FC<CustomHelperProps> = ({ helper, setHelper }) => {
  const [enabled, setEnabled] = useState(false)
  return (
    <Stack gap="xs">
      <Switch
        label={<Title order={3}>Custom Helpers (JavaScript)</Title>}
        size="lg"
        checked={enabled}
        onChange={(e) => {
          setEnabled(e.target.checked)
        }}
      />
      {enabled && <HelperEditor value={helper} onChange={setHelper} />}
    </Stack>
  )
}
