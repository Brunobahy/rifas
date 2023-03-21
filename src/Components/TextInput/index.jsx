import React from 'react'
import styles from './TextInput.module.css'
export default function TextInput({ id, tipo = "text", change,placeholder, valor, obrigado = false }) {
    return (
        <div className={styles.container}>
            <label className={styles.label} htmlFor={id}>{id}</label>
            <input className={styles.input} required={obrigado} value={valor} onChange={(event) => change(event.target.value)} type={tipo} placeholder={placeholder} />
        </div>
    )
}
