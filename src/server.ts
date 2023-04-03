import app from './app'
import AppDataSource from './data-source'

AppDataSource.initialize().then(() => {
    console.log('Database connected!')
    app.listen(3001, () => {
        console.log('Server running in port 3001')
    })
    })  
    .catch(err => {
    console.log(err)
    })