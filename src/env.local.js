import { GoogleSpreadsheet } from 'google-spreadsheet'
import credenciais from './chaves.json'


export async function conectaPlanilha() {

    const doc = new GoogleSpreadsheet('1oAtW-79F2gtsOuwFsKOt1PGeXRZfS7dWW2M25pxv0ug');

    await doc.useServiceAccountAuth({
        client_email: credenciais.client_email,
        private_key: credenciais.private_key,
    });

    await doc.loadInfo(); // loads document properties and worksheets
    const sheet = doc.sheetsByIndex[0]
    const dados = await sheet.getRows()

    const lista = dados.map((dado, index) =>
        index = {
            numero: dado.numero,
            nome: dado.nome || null,
            instagram: dado.instagram || null,
            whatsapp: dado.whatsapp || null
        }
    )


    return (
        lista
    )

}