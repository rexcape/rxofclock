import { TemplateEditor } from '@/components'
import { useMyCopy } from '@/hooks'
import {
  ActionIcon,
  Box,
  Flex,
  Group,
  px,
  Text,
  useMantineTheme,
} from '@mantine/core'
import { IconDownload, IconCopy } from '@tabler/icons-react'
import saveAs from 'file-saver'
import { FC } from 'react'
import dayjs from 'dayjs'

export interface TemplateInputProps {
  template: string
  setTemplate: (t: string) => void
}

export const TemplateInput: FC<TemplateInputProps> = ({
  template,
  setTemplate,
}) => {
  const handleDownloadTemplate = () => {
    const blob = new Blob([template], { type: 'text/plain;charset=utf-8' })
    saveAs(
      blob,
      `template_${dayjs().format('template_YYYY_MM_DD_HH_mm_ss')}.txt`
    )
  }
  const theme = useMantineTheme()
  const myCopy = useMyCopy()

  return (
    <Box pos="relative">
      <ActionIcon.Group
        pos="absolute"
        right={px(theme.spacing.sm)}
        top={px(theme.spacing.sm)}
        style={{ zIndex: 2 }}
      >
        <ActionIcon variant="default" onClick={handleDownloadTemplate}>
          <IconDownload size={16} />
        </ActionIcon>
        <ActionIcon variant="default" onClick={() => myCopy(template)}>
          <IconCopy size={16} />
        </ActionIcon>
      </ActionIcon.Group>
      <Box p="sm" bg="gray.1" className="template-input-wrapper top">
        <Text ff="monospace">{'{{#each data}}'}</Text>
      </Box>
      <TemplateEditor value={template} onChange={setTemplate} />
      <Box p="sm" bg="gray.1" className="template-input-wrapper bottom">
        <Text ff="monospace">{'{{/each}}'}</Text>
      </Box>
    </Box>
  )
}
