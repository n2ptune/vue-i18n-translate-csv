import { client_email, private_key } from '../credentials.json'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'

export async function runInSheet(full: string, words: string[], fn: string[]) {
  const authorize = new JWT({
    email: client_email,
    key: private_key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  })
  const spreadsheetId = '14GNa7GMwQbfk9PEb-1lC1W15F4Tq-KQ3h1QUiUsUDCo'

  const doc = new GoogleSpreadsheet(spreadsheetId, authorize)
  await doc.loadInfo()

  const sheet = await doc.addSheet({ headerValues: ['text', 'translate'] })
  // const rows = await sheet.getRows()

  // await sheet.addRows([{
  //   text: 'test',
  //   translate: '=GOOGLETRANSLATE("apple", "en", "ko")'
  // }])

  const rows = []

  for (let i = 0; i < words.length; i++) {
    rows.push({ text: words[i], translate: fn[i] })
  }

  await sheet.addRows(rows)

  console.log(rows)

  // await sheet.spreadsheets.values.update({
  //   spreadsheetId,
  //   range: 'A1:B1',
  //   valueInputOption: 'USER_ENTERED',
  //   requestBody: {
  //     range: 'A1:B1',
  //     values: [
  //       [
  //         '=GOOGLETRANSLATE("apple", "en", "ko")',
  //         '=GOOGLETRANSLATE("banana", "en", "ko")'
  //       ]
  //     ]
  //   }
  // })

  // const context = await sheet.spreadsheets.values.get({
  //   spreadsheetId: '14GNa7GMwQbfk9PEb-1lC1W15F4Tq-KQ3h1QUiUsUDCo',
  //   range: ''
  // })

  // console.log(context.data)
}
