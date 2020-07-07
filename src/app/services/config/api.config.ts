const ENV: 'DEV' | 'PROD' = 'DEV'
const CURRENT_URL_API = ENV === 'DEV' ? 'http://127.0.0.1:8080/' : ''

export { CURRENT_URL_API, ENV }
