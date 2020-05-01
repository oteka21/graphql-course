import { connectDB } from '../db'
import { ObjectID } from 'mongodb'
import { errorHandler} from '../errorHandler'

export const queries = {
  Query: {
    async getCourses () {
      let db
      let courses = []

      try {
        db = await connectDB()
        courses = await db.collection('courses').find().toArray()
      } catch (err) {
        errorHandler(err)
      }
      return courses
    },
    async getCourse (root, { id }) {
      let db,
        course

      try {
        db = await connectDB()
        course = await db.collection('courses').findOne({ _id: ObjectID(id) })
      } catch (err) {
        errorHandler(err)
      }
      return course
    },
    async getStudents () {
      let db
      let students = []

      try {
        db = await connectDB()
        students = await db.collection('students').find().toArray()
      } catch (err) {
        errorHandler(err)
      }
      return students
    },
    async getStudent (root, { id }) {
      let db,
        student

      try {
        db = await connectDB()
        student = await db.collection('students').findOne({ _id: ObjectID(id) })
      } catch (err) {
        errorHandler(err)
      }
      return student
    }
  }
}
