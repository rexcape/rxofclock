import { FC } from 'react'

import { Group, Stack, Text, rem } from '@mantine/core'
import { IconUpload, IconX, IconFileSpreadsheet } from '@tabler/icons-react'
import { Dropzone, MS_EXCEL_MIME_TYPE } from '@mantine/dropzone'

export interface FileSelectProps {
  file?: File
  onSelect?: (file?: File) => void
}

export const FileSelect: FC<FileSelectProps> = ({ file, onSelect }) => {
  return (
    <Stack gap="small">
      <Dropzone
        onDrop={(files) => {
          if (files[0]) {
            onSelect?.(files[0])
          }
        }}
        onReject={(files) => console.log('rejected files', files)}
        maxSize={5 * 1024 ** 2}
        accept={MS_EXCEL_MIME_TYPE}
      >
        <Group
          justify="center"
          gap="md"
          mih={160}
          style={{ pointerEvents: 'none' }}
        >
          <Dropzone.Accept>
            <IconUpload
              style={{
                width: rem(52),
                height: rem(52),
                color: 'var(--mantine-color-blue-6)',
              }}
              stroke={1.5}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              style={{
                width: rem(52),
                height: rem(52),
                color: 'var(--mantine-color-red-6)',
              }}
              stroke={1.5}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconFileSpreadsheet
              style={{
                width: rem(52),
                height: rem(52),
                color: 'var(--mantine-color-dimmed)',
              }}
              stroke={1.5}
            />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag a .xlsx/.xls file here or click to{' '}
              {!!file ? 'replace current' : 'select'} file
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              The max file size is 5MB
            </Text>
          </div>
        </Group>
      </Dropzone>
      {file && <Text size="lg" style={{ flex: 1 }}>Current file: {file.name}</Text>}
    </Stack>
  )
}
