import React, { useEffect, useState } from 'react'
import Escolha from '../Escolha'
import TextInput from '../TextInput'
import { GoogleSpreadsheet } from 'google-spreadsheet';
import credenciais from '../../chaves.json'
import styles from './Formulario.module.css'
import Link from 'next/link';
import { FlatTree, motion } from 'framer-motion'
import { useRifasContext } from '@/common/Rifas';
import { useRouter } from 'next/router';

export default function Formulario({ lista }) {

    const { nome, setNome, instagram, setInstagram, whatsapp, setWhatsapp, numeros, erro } = useRifasContext()

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

    const rota = useRouter()


    return (

        <form
            className={styles.formulario}
        >
            <div className={styles.container}>
                <TextInput alerta={'O nome deve conter pelo menos 4 caracteres'} placeholder={"Nome"} id={"Nome"} valor={nome} obrigado={true} change={setNome} />
                <TextInput placeholder={"Instagram"} id={"Instagram"} valor={instagram} change={setInstagram} />
                <TextInput alerta={'O Whatsapp deve conter pelo menos 11 caracteres contando com o DDD, EX:(DDD) 9-XXXX-XXXX'} placeholder={"(DDD) 9-XXXX-XXXX"} id={"Whatsapp"} valor={whatsapp} change={setWhatsapp} />
                <div className={styles.legenda}>Disponível</div>
                <div className={styles.legenda}>Escolhido</div>
                <div className={styles.legenda}>Indisponível</div>
            </div>
            <Escolha lista={lista} numeros={numeros} />
            <div className={styles.box_pagamento}>
                <button href={'comprovante'} onClick={(event) => { event.preventDefault(), mudaLinha(nome, instagram, numeros, whatsapp), rota.push('/comprovante')}} disabled={!(erro.Nome === '' && erro.Whatsapp === '' && numeros.length >0)} className={styles.pagamento}>Enviar</button>

                {/* <Link href={'comprovante'} onClick={() => mudaLinha(nome, instagram, numeros, whatsapp)} className={styles.pagamento}><button disabled={true}>Enviar</button></Link> */}
                {erro.Nome && <span>{erro.Nome}</span>}
                {erro.Whatsapp && <span>{erro.Whatsapp}</span>}
                {!(numeros.length > 0 ) && <span>Você deve escolher pelo menos 1 numero</span>}
            </div>
        </form>
    )
}