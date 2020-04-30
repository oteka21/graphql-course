'use strict'
import { connectDB } from './db'
export const mutations = {
  Mutation: {
    async createCourse (root, { input }) {
      const defaults = {
        teacher: '',
        topic: ''
      }

      const newCourse = { ...defaults, ...input }
      let db,
        course
      try {
        db = await connectDB()
        course = await db.collection('courses').insertOne(newCourse)
        input._id = course.insertedId
      } catch (err) {
        console.error(err)
      }
      return input
    }
  }
}
