import { Document } from 'mongoose'

export default interface Developer extends Document {
  _id: string
  name: string
  sex: string
  age: number
  hobby: string
  birthdate: string
}
