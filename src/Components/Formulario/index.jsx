import React, { useEffect, useState } from 'react'
import Escolha from '../Escolha'
import TextInput from '../TextInput'
import { GoogleSpreadsheet } from 'google-spreadsheet';
import credenciais from '../../chaves.json'
import styles from './Formulario.module.css'
import Link from 'next/link';
import { FlatTree, motion } from 'framer-motion'
import { useRifasContext } from '@/common/Rifas';

export default function Formulario({ lista }) {

    const { nome, setNome, instagram, setInstagram, whatsapp, setWhatsapp, numeros } = useRifasContext()

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

    const verifica = (nome.length >= 4) && (whatsapp.length === 11) && (numeros.length >= 1)

    return (
        <form
            className={styles.formulario}
        >
            <div className={styles.container}>
                <TextInput placeholder={"Nome"} id={"Nome"} valor={nome} obrigado={true} change={setNome} />
                <TextInput placeholder={"Instagram"} id={"Instagram"} valor={instagram} change={setInstagram} />
                <TextInput placeholder={"(DD) 9-XXXX-XXXX"} id={"Whatsapp"} valor={whatsapp} change={setWhatsapp} />
            </div>
            <Escolha lista={lista} numeros={numeros} />
            <div className={styles.box_pagamento}>
                <Link href={'comprovante'} onClick={() => mudaLinha(nome, instagram, numeros, whatsapp)} className={styles.pagamento}><button disabled={!verifica}>Enviar</button></Link>
                {!(nome.length >= 4) && <span>O nome deve conter pelo menos 4 caracteres</span>}
                {!(whatsapp.length >= 11) && <span>O Whatsapp deve conter pelo menos 11 caracteres contando com o DDD</span>}
                {!(numeros.length >= 1) && <span>Você deve escolher pelo menos 1 numero</span>}
            </div>
        </form>
    )
}
