'use strict'

import {graphql, buildSchema} from 'graphql'

//define a schema

const schema = buildSchema(`
  type Query {
    hello: String
  }
`)

graphql(schema, '{hello}')
.then(data => console.log(data))