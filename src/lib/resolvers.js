import db from '../../db.json'
export const resolvers = {
  getCourses () {
    return db.courses
  }
}
