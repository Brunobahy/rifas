import Formulario from '@/Components/Formulario'
import React from 'react'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import credenciais from '../chaves.json'
import Escolha from '@/Components/Escolha';

export async function getServerSideProps(context) {

    const doc = new GoogleSpreadsheet('1oAtW-79F2gtsOuwFsKOt1PGeXRZfS7dWW2M25pxv0ug');

    await doc.useServiceAccountAuth({
        client_email: credenciais.client_email,
        private_key: credenciais.private_key,
    });

    await doc.loadInfo(); // loads document properties and worksheets
    const sheet = doc.sheetsByIndex[0]
    const dados = await sheet.getRows()

    const lista = dados.map((dado, index)=> 
            index={
                numero: dado.numero,
                nome: dado.nome || null,
                instagram: dado.instagram || null,
                whatsapp: dado.whatsapp || null
                
            }
        )

    return {
        props: {
            lista,
        }
    }
}

export default function Home({ lista}) {

    async function enviar(nome, instagram, numero, Whatsapp){
        
    }

    return (
        <>
            <h1>Rifas</h1>
            <Formulario enviar={enviar} lista={lista} />
        </>
    )
}
