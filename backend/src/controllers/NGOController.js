const connection = require('../database/connection')
const crypto = require('crypto')

module.exports = {
   async store(request, response) {
      const { name, email, phone_number, city, uf } = request.body

      const id = crypto.randomBytes(4).toString('HEX')


      await connection('ngo').insert({
         id,
         name,
         email,
         phone_number,
         city,
         uf
      })

      return response.status(201).json({ id })
   },

   async index(request, response) {
      const ngos = await connection('ngo').select('*')

      return response.json(ngos)
   }
}