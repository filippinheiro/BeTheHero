const connection = require('../database/connection')
const generateUniqueId = require('../utils/generateUniqueId')

module.exports = {
   async store(request, response) {
      const { name, email, phone_number, city, uf } = request.body

      const id = generateUniqueId()

      try {
         await connection('ngo').insert({
            id,
            name,
            email,
            phone_number,
            city,
            uf
         })

         return response.status(201).json({ id })

      }
      catch {
         return response.status(400).json({
            error: "could not understand"
         })
      }
   },

   async index(request, response) {
      const ngos = await connection('ngo').select('*')

      return response.json(ngos)
   }
}