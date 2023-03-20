import React, { useState } from 'react'
import Escolha from '../Escolha'
import TextInput from '../TextInput'

export default function Formulario({ enviar, lista }) {

    const numeros = lista.map(dado=> dado.numero)

    const [nome,setNome] = useState('')
    const [instagram,setInstagram] = useState('')
    const [whatsapp,setWhatsapp] = useState('')

    return (
        <form onSubmit={enviar(nome, instagram, whatsapp)}>
            <TextInput id={"Nome"} />
            <TextInput id={"'@' do Instagram "} />
            <TextInput id={"Whatsapp"} />
            <Escolha numeros={numeros} />
        </form>
    )
}
