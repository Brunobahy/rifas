const { createContext, useState, useContext } = require("react");

export const RifasContext = createContext();
RifasContext.displayName = 'Rifas';

export default function RifasProvider({ children }) {
    const [nome, setNome] = useState('')
    const [instagram, setInstagram] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [numeros, setNumeros] = useState([])
    const [valor, setValor] = useState([])
    const [erro, setErro] = useState({
        Nome: 'O nome deve conter pelo menos 4 caracteres',
        Whatsapp: 'O Whatsapp deve conter pelo menos 11 caracteres contando com o DDD, EX:(DDD) 9-XXXX-XXXX' 
    })


    return (
        <RifasContext.Provider value={{ valor, setValor, nome, setNome, instagram, setInstagram, whatsapp, setWhatsapp, numeros, setNumeros, erro, setErro }}>
            {children}
        </RifasContext.Provider>
    )
}


export function useRifasContext() {
    const { valor, setValor, nome, setNome, instagram, setInstagram, whatsapp, setWhatsapp, numeros, setNumeros, erro, setErro } = useContext(RifasContext)

    function escolhido(numero) {
        if (!numeros.some(item => item === numero)) {
            setNumeros([...numeros, numero])
        } else {
            setNumeros(numeros.filter(item => item !== numero))
        }
    }

    setValor(numeros.length * 5)

    const [invalido, setInvalido] = useState(false)


    function verifica(id, valor, alerta) {

        if (id === 'Nome') {

            if (!(valor.length >= 4)) {
                setErro({...erro,[id]: alerta })
                console.log(erro)
                return setInvalido(true)
            } else {

                setErro({...erro,[id]:''})
                return setInvalido(false)
            }
        }
        if (id === 'Whatsapp') {
            return testaZap(id, valor, alerta)
        }
    }

    function testaZap(id, valor, alerta) {
        const RegExp = /^(\(?\s?\d{2}\)?\s?)?9?\s?\-?\d{4}\s?\-?\s?\d{4}$/

        if (!RegExp.test(valor)) {
            setErro({...erro,[id]: alerta })
            setInvalido(true)
        } else {
            setErro({...erro,[id]:''})
            setInvalido(false)
        }

    }


    return {
        escolhido,
        nome,
        setNome,
        instagram,
        setInstagram,
        whatsapp,
        setWhatsapp,
        numeros,
        valor,
        verifica,
        invalido,
        erro,
        setErro
    }
}


