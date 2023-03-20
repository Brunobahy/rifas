import Formulario from '@/Components/Formulario'
import React from 'react'
import { conectaPlanilha } from '@/env.local'
import styles from '../styles/home.module.css'
import {motion} from 'framer-motion'

export async function getServerSideProps(context) {
    const lista = await conectaPlanilha()
    return {
        props: {
            lista
        }
    }
}

export default function Home({ lista }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={styles.container}
        >
            <h1 className={styles.titulo}>Rifas</h1>
            <Formulario lista={lista} />
        </motion.div>
    )
}
