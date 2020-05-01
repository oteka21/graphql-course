'use strict'
import { connectDB } from '../db'
import { ObjectID } from 'mongodb'
import { errorHandler} from '../errorHandler'
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
        errorHandler(err)
      }
      return input
    },
    async editCourse (root, { id, input }) {
      let db,
        course
      try {
        db = await connectDB()
        await db.collection('courses').updateOne({ _id: ObjectID(id) }, { $set: input })
        course = await db.collection('courses').findOne({ _id: ObjectID(id) })
      } catch (err) {
        errorHandler(err)
      }
      return course
    },
    async createStudent (root, { input }) {
      const defaults = {
        email: ''
      }

      const newStudent = { ...defaults, ...input }
      let db,
        student
      try {
        db = await connectDB()
        student = await db.collection('students').insertOne(newStudent)
        input._id = student.insertedId
      } catch (err) {
        errorHandler(err)
      }
      return input
    },
    async editStudent (root, { id, input }) {
      let db,
        student
      try {
        db = await connectDB()
        await db.collection('students').updateOne({ _id: ObjectID(id) }, { $set: input })
        student = await db.collection('students').findOne({ _id: ObjectID(id) })
      } catch (err) {
        errorHandler(err)
      }
      return student
    },
    async addPeople (root, { courseID, studentID }) {
      let db,
        course,
        people,
        updatedCourse

      try {
        db = await connectDB()
        people = await db.collection('students').findOne({ _id: ObjectID(studentID) })
        course = await db.collection('courses').findOne({ _id: ObjectID(courseID) })

        if (!people || !course) throw new Error('Course or Student not found')

        await db.collection('courses').updateOne(
          { _id: ObjectID(courseID) },
          { $addToSet: { people: ObjectID(studentID) } }
        )

        updatedCourse = await db.collection('courses').findOne({ _id: ObjectID(courseID) })
      } catch (err) {
        errorHandler(err)
      }

      return updatedCourse
    }
  }
}
