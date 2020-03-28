import React, { useState } from 'react'
import { FiLogIn } from 'react-icons/fi'

import './styles.css'
import api from '../../services/api'

import LogoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'
import { Link, useHistory } from 'react-router-dom'

export default function Login() {

   const [id, setId] = useState('')
   const history = useHistory()

   async function handleLogin(e) {
      e.preventDefault()

      try {
         const response = await api.post('sessions', {id})
         console.log(response)
         localStorage.setItem('ngoId', id)
         localStorage.setItem('ngoName', response.data.name)
         console.log(response.data.name)
         history.push('/profile')
     
      } catch (error) {
         alert('falha no login, tente novamente')
      }

   }

   return (
      <div className="login-container">
         <section className="form">
            <img src={LogoImg} alt="Be the Hero" />

            <form onSubmit={handleLogin}>
               <h1>Faça seu login</h1>

               <input
                  value={id}
                  onChange={
                     e => setId(e.target.value)
                  }
                  required
                  placeholder="Sua ID" />
               <button type="submit" className="button">Entrar</button>

               <Link className="back-link" to="/register">
                  <FiLogIn size={16} color="#e02041" />
                  Não tenho Cadastro
               </Link>
            </form>
         </section>
         <img src={heroesImg} alt="Heroes" />
      </div>
   );
}
