import React, { useState } from 'react'
import './styles.css'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import LogoImg from '../../assets/logo.svg'
import api from '../../services/api'

import './styles.css';

export default function NewIncident() {


    const history = useHistory()

    const ngoId = localStorage.getItem('ngoId')

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')


    async function handleNewIncident(e) {
        e.preventDefault()

        const data = {
            title, 
            description,
            value
        }

        await api.post('incidents', data,{
            headers: {
                authorization: ngoId
            }
        })


        history.push('/profile')

        try {
            
        } catch (error) {
            alert('Erro ao cadastrar caso, tente novamente')
        }
    }

    return (
        <div className="incident-container" >
            <div className="content" >
                <section>
                    <img src={LogoImg} alt="Be the Hero" />

                    <h1 > Cadastrar novo caso </h1> <p >
                        Descreva o caso detalhadamente para encontrar um herói para fazer isso. </p>

                    <Link className="back-link"
                        to="/profile" >
                        <FiArrowLeft size={16}
                            color="#e02041" />
                        Voltar para perfil </Link>
                </section >
                <form onSubmit={handleNewIncident}>
                    <input type="text"
                        placeholder="Título do caso"
                        value={title}
                        required
                        onChange={e => setTitle(e.target.value)} />
                    <textarea type="text"
                        value={description}
                        required
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Descrção" />
                    <input type="text"
                        value={value}
                        required
                        onChange={e => setValue(e.target.value)}
                        placeholder="Valor em reais" />
                    <button className="button"
                        type="submit" > Cadastrar </button>
                </form >
            </div>
        </div >
    );
}