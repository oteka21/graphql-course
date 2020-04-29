import { courses } from '../../db.json'

export const resolvers = {
  Query: {
    getCourses () {
      return courses
    },
    getCourse (root, args) {
      const course = courses.filter(item => item._id === args.id)
      return course.pop()
    }
  }
}
