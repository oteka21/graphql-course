'use strict'

import {graphql, buildSchema} from 'graphql'

//define a schema

const schema = buildSchema(`
  type Query {
    hello: String
    saludo: String
  }
`)

// configurar los resolvers

const resolvers = {
  hello(){
    return 'Hola mmundo!'
  },
  saludo(){
    return 'Este es un saludo'
  }
}

// make a query

graphql(schema, '{hello}', resolvers)
.then(data => console.log(data))


graphql(schema, '{saludo}', resolvers)
.then(data => console.log(data))