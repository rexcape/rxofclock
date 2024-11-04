import { Paper, Text, List, Code } from '@mantine/core'
import { FC } from 'react'

export interface HelperCardProps {
  title: string
  description: string
  usage: string
  value?: string
  output: string
}

export const HelperCard: FC<HelperCardProps> = ({
  title,
  description,
  usage,
  value,
  output,
}) => {
  return (
    <Paper withBorder p="md">
      <Text size="lg" fw="bold">
        {title}
      </Text>
      <Text>{description}</Text>
      <Text size="lg" fw="bold">
        Example
      </Text>
      <List size="sm">
        <List.Item>
          Template: <Code>{usage}</Code>
        </List.Item>
        {value && (
          <List.Item>
            Column value: <Code>{value}</Code>
          </List.Item>
        )}
        <List.Item>
          Output: <Code>{output}</Code>
        </List.Item>
      </List>
    </Paper>
  )
}
