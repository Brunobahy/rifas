import React, { useEffect, useState } from 'react'
import Escolha from '../Escolha'
import TextInput from '../TextInput'
import { GoogleSpreadsheet } from 'google-spreadsheet';
import credenciais from '../../chaves.json'
import styles from './Formulario.module.css'
import Link from 'next/link';
import { FlatTree, motion } from 'framer-motion'

export default function Formulario({ lista }) {

    async function mudaLinha(nome, instagram, numeros, whatsapp) {

        const doc = new GoogleSpreadsheet('1oAtW-79F2gtsOuwFsKOt1PGeXRZfS7dWW2M25pxv0ug');

        await doc.useServiceAccountAuth({
            client_email: credenciais.client_email,
            private_key: credenciais.private_key,
        });

        await doc.loadInfo(); // loads document properties and worksheets
        const sheet = doc.sheetsByIndex[0]
        const dados = await sheet.getRows()


        numeros.map(numero => {
            const linha = dados.find(item => item.numero === numero)

            linha.nome = nome;
            linha.instagram = instagram;
            linha.whatsapp = whatsapp;
            linha.save()

        })
    }


    const [nome, setNome] = useState('')
    const [instagram, setInstagram] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [numeros, setNumeros] = useState([])

    function escolhido(numero) {
        if (!numeros.some(item => item === numero)) {
            setNumeros([...numeros, numero])
        } else {
            setNumeros(numeros.filter(item => item !== numero))
        }
    }

    return (
        <form
            className={styles.formulario}
        >
            <div className={styles.container}>
                <TextInput id={"Nome"} valor={nome} obrigado={true} change={setNome} />
                <TextInput id={"Instagram"} valor={instagram} change={setInstagram} />
                <TextInput id={"Whatsapp"} valor={whatsapp} obrigado={true} change={setWhatsapp} />
            </div>
            <Escolha lista={lista} escolhido={escolhido} numeros={numeros} />
            <Link href={'comprovante'} onClick={() => mudaLinha(nome, instagram, numeros, whatsapp)} className={styles.pagamento}><button disabled={nome ? false : true}>Enviar</button></Link>
        </form>
    )
}