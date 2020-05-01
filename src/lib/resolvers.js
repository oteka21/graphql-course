'use strict'

import { queries } from './queries/index'
import { mutations } from './mutations/index'
import { types } from './types/index'

export const resolvers = { ...queries, ...mutations, ...types }