import React, { useState } from 'react'
import './styles.css'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import LogoImg from '../../assets/logo.svg'
import api from '../../services/api'

export default function Register() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone_number, setPhoneNumber] = useState("")
  const [city, setCity] = useState("")
  const [uf, setUf] = useState("")

  const history = useHistory()

  async function handleRegister(e) {
    e.preventDefault()

    const data = {
      name,
      email,
      phone_number,
      city,
      uf
    }
    try {

      console.log(data)
      const response = await api.post('ngos', data)

      alert(`Seu ID de acesso ${response.data.id}`)

      history.push('/')
    }
    catch {
      alert('Erro no cadastro')
    }

  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={LogoImg} alt="Be the Hero" />

          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude as pessoas a encontrar os
            casos da sua ong
            </p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041" />
            Não tenho cadastro
            </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input type="text"
            value={name}
            required
            onChange={e => setName(e.target.value)}
            placeholder="Nome da ONG" />
          <input type="email"
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
            name="email"
            placeholder="email" />
          <input type="text"
            value={phone_number}
            required
            onChange={e => setPhoneNumber(e.target.value)}
            placeholder="Número" />

          <div className="input-group">
            <input placeholder="Cidade"
              value={city}
              required
              onChange={e => setCity(e.target.value)} />
            <input placeholder="UF"
              value={uf}
              required
              onChange={e => setUf(e.target.value)}
              style={{ width: 80 }} />
          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
