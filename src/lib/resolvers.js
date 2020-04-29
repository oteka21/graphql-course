import { courses } from '../../db.json'
import {connectDB} from './db'
import {ObjectID} from 'mongodb'

export const resolvers = {
  Query: {
    async getCourses () {
      let db, 
      courses = []

      try {
        db = await connectDB()
        courses = await db.collection('courses').find().toArray()
      }catch(err){
        console.error(err)
      }
      return courses
    },
    async getCourse (root, {id}) {
      let db, 
      course

      try {
        db = await connectDB()
        course = await db.collection('courses').findOne({_id: ObjectID(id)})
      }catch(err){
        console.error(err)
      }
      return course
    }
  }
}
