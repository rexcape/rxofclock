import { useMyCopy } from '@/hooks'
import { IconDownload, IconCopy } from '@tabler/icons-react'
import saveAs from 'file-saver'
import dayjs from 'dayjs'
import { FC } from 'react'
import { Textarea, ActionIcon, Box, useMantineTheme, px } from '@mantine/core'

export interface ResultProps {
  output: string
}

export const Result: FC<ResultProps> = ({ output }) => {
  const myCopy = useMyCopy()
  const theme = useMantineTheme()
  const handleCopy = () => {
    myCopy(output)
  }
  const handleDownloadResult = () => {
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' })
    saveAs(blob, `result_${dayjs().format('YYYY_MM_DD_HH_mm_ss')}.txt`)
  }

  return (
    <Box pos="relative">
      <ActionIcon.Group
        pos="absolute"
        right={px(theme.spacing.sm)}
        top={px(theme.spacing.sm)}
        style={{ zIndex: 2 }}
      >
        <ActionIcon variant="default" onClick={handleDownloadResult}>
          <IconDownload size={16} />
        </ActionIcon>
        <ActionIcon variant="default" onClick={handleCopy}>
          <IconCopy size={16} />
        </ActionIcon>
      </ActionIcon.Group>
      <Textarea ff="monospace" value={output} readOnly rows={16} />
    </Box>
  )
}
