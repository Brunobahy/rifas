import React, { useEffect, useState } from 'react'
import styles from './Escolha.module.css'
import { conectaPlanilha } from '@/env.local'
import { motion } from 'framer-motion'
import { useRifasContext } from '@/common/Rifas'

export default function Escolha({ lista, numeros }) {
    const { escolhido, valor } = useRifasContext()

    const [novaLista, setNovaLista] = useState(lista)

    async function carregar() {
        const refresh = await conectaPlanilha()
        setNovaLista(refresh)
    }

    const [carregando, setCarregando] = useState(true)

    useEffect(() => {
        carregar()
    }, [carregando])

    setTimeout(() => {
        setCarregando(false)
    }, '5000');

    return (
        <>
            {!carregando
                ? <motion.ul
                    className={styles.container}
                    initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
                    animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}
                    transition={{duration: 1}}
                >
                    {novaLista.map((item, index) =>
                        <li
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            key={index}
                            className={`${styles.numeros} ${!item.nome ? styles.ativado : styles.desativado} ${numeros.find(numero => numero === item.numero) ? styles.escolhido : ''}`}
                            onClick={!item.nome
                                ? (event) => { event.preventDefault(), escolhido(item.numero) }
                                : () => alert(`O numero ${item.numero} já escolhido `)} >
                            {item.numero}
                        </li>
                    )}
                </motion.ul>
                : <div className={styles.container}> <img src="/loading.gif" alt="carregando" className={styles.loading} /> </div>
            }
            <h3>Numeros escolhidos: {numeros.join()}</h3>
            <h3>Valor à Pagar: R${valor},00</h3>
        </>
    )
}
