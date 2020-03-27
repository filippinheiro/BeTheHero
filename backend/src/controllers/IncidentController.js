const connection = require('../database/connection')

module.exports = {
   async store(request, response) {
      const { title, description, value } = request.body
      const ngo_id = request.headers.authorization

      const [id] = await connection('incident').insert({
         title,
         description,
         value,
         ngo_id
      })
      return response.json({ id })
   },

   async index(request, response) {

      const { page = 1 } = request.query

      const [count] = await connection('incident')
         .count()

      const incidents = await connection('incident')
         .join('ngo', 'ngo.id', '=', 'incident.ngo_id')
         .limit(5)
         .offset((page - 1) * 5)
         .select(['incident.*',
            'ngo.name',
            'ngo.email',
            'ngo.phone_number',
            'ngo.city',
            'ngo.uf'])

      response.header('X-Total-Count', count['count(*)'])

      return response.json(incidents)
   },

   async delete(request, response) {
      const { id } = request.params
      const ngo_id = request.headers.authorization


      try {

         const incident = await connection('incident').where('id', id).select('ngo_id').first()

         if (incident.ngo_id !== ngo_id) {
            return response.status(401).json({
               error: 'Unauthorized Operation'
            })
         }

         await connection('incident').where('id', id).delete()
         return response.status(204).send()

      } catch (error) {
         return response.status(400).json({
            error: 'This incident does not exist'
         })
      }


   }
}