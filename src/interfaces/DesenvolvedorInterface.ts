import { Document } from 'mongoose'

export default interface DesenvolvedorInterface extends Document {
  _id: string
  sexo: string
  idade: number
  hobby: string
  datanascimento: string
}
