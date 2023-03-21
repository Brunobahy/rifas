import React from 'react'
import { motion } from 'framer-motion'
import styles from '../styles/comprovante.module.css'
import { useRifasContext } from '@/common/Rifas'

export default function comprovante() {
    const { valor } = useRifasContext()
    return (
        <motion.div
            initial={{ clipPath: 'circle(0% at 50% 50%)' }}
            animate={{ clipPath: 'circle(100% at 50% 50%)' }}
            className={styles.container}
        >
            <h1 className={styles.titulo}>Pagamento<strong>e</strong>Comprovante</h1>

            <div className={styles.pagamento}>
                <img className={styles.qrcode} src="/qrcode.png" alt="" />

                <h3 className={styles.valor}>Valor à pagar ${valor}</h3>
                <h2 className={styles.pix}>Chave PIX: <a href='mailto:alohagihsilva@gmail.com'>alohagihsilva@gmail.com</a></h2>
                <a className={styles.link} href="https://forms.gle/WeKau6bGWAxGR78T6">Enviar comprovante</a>
            </div>



        </motion.div>
    )
}
