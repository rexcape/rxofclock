import { Anchor } from '@mantine/core'
import { IconExternalLink } from '@tabler/icons-react'
import { FC } from 'react'

export interface DocLinkProps {
  href: string
  children: React.ReactNode
}

export const DocLink: FC<DocLinkProps> = ({ href, children }) => (
  <Anchor href={href} target="_blank">
    {children}
    <IconExternalLink size={14} />
  </Anchor>
)
