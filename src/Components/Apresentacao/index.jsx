import React from 'react'
import styles from './Apresentacao.module.css'

export default function Apresentacao() {
    return (
        <div className={styles.container}>
            <p className={styles.texto}>
                Olá, vamos nos casar em alguns meses, e para realizar essa cerimônia tivemos a ideia de fazer esta rifa.
                Que tal ajudar esse casal a <strong>realizar um sonho</strong> e ainda, concorrer a uma Alexa?
                <strong> Você pode!</strong> Cada número custa o valor de <strong>$5,00</strong> e o sorteio será realizado assim que todos os números forem vendidos!</p>
        </div>
    )
}
