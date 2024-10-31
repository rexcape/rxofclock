import { notifications } from '@mantine/notifications'
import { rem } from '@mantine/core'
import { IconX, IconCheck } from '@tabler/icons-react'

const toast = {
  success(msg: string) {
    notifications.show({
      title: 'Success',
      message: msg,
      color: 'teal',
      icon: <IconCheck style={{ width: rem(20), height: rem(20) }} />,
    })
  },
  error(msg: string) {
    notifications.show({
      title: 'Error',
      message: msg,
      color: 'red',
      icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
    })
  },
}

export default toast
