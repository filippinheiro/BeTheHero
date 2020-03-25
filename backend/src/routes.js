const express = require('express')

const NGOController = require('./controllers/NGOController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router()

routes.post('/sessions', SessionController.store)

routes.get('/ngos', NGOController.index)
routes.post('/ngos', NGOController.store)

routes.post('/incidents', IncidentController.store)
routes.get('/incidents', IncidentController.index)

routes.delete('/incidents/:id', IncidentController.delete)
routes.get('/profile', ProfileController.index)

module.exports = routes