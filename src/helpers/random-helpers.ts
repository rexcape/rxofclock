import { nanoid } from 'nanoid'
import { v4 as uuidv4 } from 'uuid'

export const randomHelpers = {
  UUID: () => uuidv4(),
  simpleUUID: () => uuidv4().replaceAll('-', ''),
  nanoid: () => nanoid(),
}
