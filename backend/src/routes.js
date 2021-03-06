const express = require('express')
const { celebrate, Segments, Joi } = require('celebrate')

const NGOController = require('./controllers/NGOController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router()

routes.post('/sessions', celebrate({
   [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
   }).unknown
}),SessionController.store)

routes.get('/ngos', NGOController.index)
routes.post('/ngos', celebrate({
   [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      phone_number: Joi.string().required().min(8).max(11),
      city: Joi.string().required(),
      uf: Joi.string().required().length(2)
   })
}), NGOController.store)

routes.post('/incidents', celebrate({
   [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
   }).unknown(),
   [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      value: Joi.number().required()
   } 
}),IncidentController.store)

routes.get('/incidents', celebrate({
   [Segments.QUERY]: Joi.object().keys({
      page: Joi.number()
   })
}),IncidentController.index)


routes.delete('/incidents/:id', celebrate({
   [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
   })
}),IncidentController.delete)


routes.get('/profile', celebrate({
   [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
   }).unknown()
}), ProfileController.index)

module.exports = routes