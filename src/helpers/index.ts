import { numberHelpers } from './number-helpers'
import { randomHelpers } from './random-helpers'
import { strHelpers } from './str-helpers'

import { HelperDeclareSpec } from 'handlebars'

const helpers = {
  ...strHelpers,
  ...numberHelpers,
  ...randomHelpers,
} as HelperDeclareSpec

export default helpers
