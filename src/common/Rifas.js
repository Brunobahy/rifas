const { createContext, useState, useContext } = require("react");

export const RifasContext = createContext();
RifasContext.displayName = 'Rifas';

export default function RifasProvider({ children }) {
    const [nome, setNome] = useState('')
    const [instagram, setInstagram] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [numeros, setNumeros] = useState([])
    const [valor, setValor] = useState([])

    return (
        <RifasContext.Provider value={{ valor, setValor, nome, setNome, instagram, setInstagram, whatsapp, setWhatsapp, numeros, setNumeros }}>
            {children}
        </RifasContext.Provider>
    )
}


export function useRifasContext() {
    const { valor, setValor, nome, setNome, instagram, setInstagram, whatsapp, setWhatsapp, numeros, setNumeros } = useContext(RifasContext)

    function escolhido(numero) {
        if (!numeros.some(item => item === numero)) {
            setNumeros([...numeros, numero])
        } else {
            setNumeros(numeros.filter(item => item !== numero))
        }
    }

    setValor(numeros.length * 5)

    return {
        escolhido,
        nome,
        setNome,
        instagram,
        setInstagram,
        whatsapp,
        setWhatsapp,
        numeros,
        valor

    }
}


