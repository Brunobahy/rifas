import Formulario from '@/Components/Formulario'
import React from 'react'
import { conectaPlanilha } from '@/env.local'
import styles from '../styles/home.module.css'
import { delay, motion } from 'framer-motion'
import Apresentacao from '@/Components/Apresentacao'

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
            <section

                className={styles.section}
            >
                <motion.div
                    initial={{ x: '-150px', opacity: 0, filter: 'blur(4px)' }}
                    animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 2 }}
                >

                    <h1

                        className={styles.titulo}
                    >
                        Rifas
                    </h1>
                    <Apresentacao />
                </motion.div>

            </section>

            <div className={styles.box}>
                <svg xmlns="http://www.w3.org/2000/svg" className={styles.svg} viewBox="0 0 1440 320"><path fill="#fff" fill-opacity="1" d="M0,160L48,165.3C96,171,192,181,288,165.3C384,149,480,107,576,106.7C672,107,768,149,864,165.3C960,181,1056,171,1152,165.3C1248,160,1344,160,1392,160L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
                <Formulario lista={lista} />
            </div>

        </motion.div>
    )
}
