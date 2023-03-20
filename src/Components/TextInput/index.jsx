import React from 'react'
import styles from './TextInput.module.css'
export default function TextInput({id, tipo = "text"}) {
    return (
        <div className={styles.container}>
            <label className={styles.label} htmlFor={id}>{id}</label>
            <input className={styles.input} type={tipo} placeholder={id} />
        </div>
    )
}
