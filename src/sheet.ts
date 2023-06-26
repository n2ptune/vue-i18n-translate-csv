import { google } from 'googleapis'
import { client_email, private_key } from '../credentials.json'

export function runInSheet(full: string, words: string[], fn: string[]) {
  const authorize = new google.auth.JWT(client_email, null, private_key, [
    'https://www.googleapis.com/auth/spreadsheets',
  ]);
}