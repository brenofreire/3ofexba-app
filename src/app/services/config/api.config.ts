const ENV: 'DEV' | 'PROD' = 'PROD'

const CURRENT_URL_API = {
    DEV: 'http://127.0.0.1:8080/',
    PROD: 'https://api-3ofexba.herokuapp.com/'
}[ENV]

export { CURRENT_URL_API, ENV }
