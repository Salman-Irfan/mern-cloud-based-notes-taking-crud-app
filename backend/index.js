const express = require('express')
const connectToMongo = require('./db')

connectToMongo()

const app = express()
app.use(express.json())
const port = 3000

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})