import mongoose from 'mongoose'
let db: any

export function conectaBancoDados (): mongoose.Connection {
  if (!db) {
      mongoose.set('useUnifiedTopology', true)
      db = mongoose.createConnection('mongodb+srv://teste:teste@cluster0.5dndk.mongodb.net/testeGazin?retryWrites=true&w=majority', {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
      })
        .on('connected', ():void => {
          console.log('Conectado na database')
        })
  }
  
  return db
}
