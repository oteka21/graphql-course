'use strict'

import { makeExecutableSchema } from 'graphql-tools'
import express from 'express'
import gqlMiddleware from 'express-graphql'
import { readFileSync } from 'fs'
import { join } from 'path'
import { resolvers } from './lib/resolvers'

const app = express()
const PORT = process.env.PORT || 3000
// define a schema
const typeDefs = readFileSync(join(__dirname, 'lib', 'schema.graphql'), 'utf-8')
const schema = makeExecutableSchema({ typeDefs, resolvers })

// configurar los resolvers

app.use('/api', gqlMiddleware({
  schema,
  rootValue: resolvers,
  graphiql: true
}))

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`)
})
