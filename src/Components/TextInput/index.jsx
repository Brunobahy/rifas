import { useRifasContext } from '@/common/Rifas'
import React, { useState } from 'react'
import styles from './TextInput.module.css'

export default function TextInput({ id, tipo = "text", change, placeholder, valor, obrigado = false, alerta}) {

    const { verifica, invalido} = useRifasContext()




    return (
        <div className={styles.container}>
            <label className={styles.label} htmlFor={id}>{id}</label>
            <input
                className={`${styles.input} ${invalido && styles.invalido}`}
                required={obrigado}
                value={valor}
                type={tipo}
                placeholder={placeholder}
                onChange={(event) => change(event.target.value)}
                onBlur={() => verifica(id, valor, alerta)}
            />
            {invalido && <span className={styles.span}>{alerta}</span>}
        </div>
    )
}
