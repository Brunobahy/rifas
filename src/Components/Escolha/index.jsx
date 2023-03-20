import React from 'react'
import styles from './Escolha.module.css'

export default function Escolha({ numeros }) {
    return (
        <div>
            {numeros.map(numero =>
                <button className={numero} >{numero}</button>
            )}
        </div>
    )
}
