import { MongoClient } from 'mongodb'

const connectDb = async (uri) => {
    let mongoClient

    try {
        mongoClient = new MongoClient(uri)
        console.log('Conectando ao cluster do banco de dados...')
        await mongoClient.connect()
        await mongoClient.db('admin').command({ping: 1})
        console.log('Conectado ao MongoDb Atlas com sucesso!')

        return mongoClient
    } catch (error) {
        console.log('Falha na conexão com o banco', error)
        process.exit()
    }
}

export default connectDb
