import { useMyCopy } from '@/hooks'
import { IconTools } from '@tabler/icons-react'
import {
  ActionIcon,
  Affix,
  Popover,
  Stack,
  Center,
  Paper,
  Text,
  ScrollArea,
} from '@mantine/core'

export const SheetHelper = ({ cols }: { cols: string[] | null }) => {
  const myCopy = useMyCopy()
  const handleCopy = (c: string) => {
    myCopy(`{{[${c}]}}`)
  }

  return (
    <Affix bottom={20} right={20}>
      <Popover>
        <Popover.Target>
          <ActionIcon radius="xl" variant="default" aria-label="view all columns">
            <IconTools size={16} />
          </ActionIcon>
        </Popover.Target>
        <Popover.Dropdown>
          {cols ? (
            <ScrollArea h={240} offsetScrollbars>
              <Stack gap="sm">
                {cols.map((c, idx) => (
                  <Paper
                    p="xs"
                    className="sheet-helper-card"
                    withBorder
                    key={idx}
                    onClick={() => {
                      handleCopy(c)
                    }}
                  >
                    <Text size="sm">{`{{[${c}]}}`}</Text>
                  </Paper>
                ))}
              </Stack>
            </ScrollArea>
          ) : (
            <Center>Select a sheet to copy column value</Center>
          )}
        </Popover.Dropdown>
      </Popover>
    </Affix>
  )
}
