import { connectDB } from '../db'
import { ObjectID } from 'mongodb'
import { errorHandler} from '../errorHandler'

export const types = {
  Course: {
    async people ({ people }) {
      let db,
        peopleData
      let ids
      try {
        db = await connectDB()
        ids = people ? people.map(id => ObjectID(id)) : []
        peopleData = ids.length > 0
          ? await db.collection('students').find({ _id: { $in: ids } }).toArray()
          : []
      } catch (err) {
        errorHandler(err)
      }

      return peopleData
    }
  }
}
