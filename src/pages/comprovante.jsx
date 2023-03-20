import React from 'react'
import { motion } from 'framer-motion'
import styles from '../styles/comprovante.module.css'

export default function comprovante() {
    return (
        <motion.div
            initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }}
            animate={{ clipPath: 'polygon(100% 0, 0 0, 0 100%, 100% 100%)' }}
            className={styles.container}
        >
            <h1 className={styles.titulo}>Pagamento<strong>e</strong>Comprovante</h1>
            <img className={styles.qrcode} src="/qrcode.png" alt="" />
            <a className={styles.link} href="https://forms.gle/WeKau6bGWAxGR78T6">Enviar comprovante</a>
        </motion.div>
    )
}
