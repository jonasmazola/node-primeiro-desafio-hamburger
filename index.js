const express = require('express')
const port = 3000
const uuid = require('uuid')
const app = express()
app.use(express.json())

const users = []


const checkUserId = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(400).json({ mensagem: 'Usuario nao encontrado' })
    }


    request.userIndex = index
    request.userId = id

    next()


}

app.get('/users', (request, response) =>{

    return response.json(users)
})


app.post('/users', (request, response) => {
    const {lanche, preco, status} = request.body

    const user = {id: uuid.v4(), lanche, preco, status}

    users.push(user)

    return response.json(user)
})


app.put('/users/:id', checkUserId, (request, response) => {
    const { lanche, preco, status } = request.body
    const index = request.userIndex
    const id = request.userId

    const updateLanche = {id, lanche, preco, status}

    users[index] = updateLanche

    return response.json(updateLanche)
})


app.delete('/users/:id', checkUserId, (request, response) => {
    const index = request.userIndex

    users.splice(index, 1)

    return response.status(204).json()
})













app.listen(port, () => {
    console.log('Serve iniciado porta  porta: ' + port)
})