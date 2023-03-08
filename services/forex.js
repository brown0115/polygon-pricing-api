const axios = require('axios')

// const getUrl = (fromCurrency, toCurrency) => {
// 	return `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrency}&to_currency=${toCurrency}&apikey=${process.env.API_KEY}`
// }

const getUrl = (fromCurrency, toCurrency) => {
  return `https://api.polygon.io/v1/last_quote/currencies/${fromCurrency}/${toCurrency}?apiKey=${process.env.STOCKS_API_KEY}`
}

const allForexEndpoints = `https://api.polygon.io/v2/snapshot/locale/global/markets/forex/tickers?apiKey=${process.env.STOCKS_API_KEY}`

// get real time currency exchange rate of EUR/USD
const getExchangeRateEURUSD = () => {
  return axios.get(getUrl('EUR', 'USD'))
}

// get real time currency exchange rate of EUR/GBP
const getExchangeRateEURGBP = () => {
  return axios.get(getUrl('EUR', 'GBP'))
}

// get real time currency exchange rate of EUR/AUD
const getExchangeRateEURAUD = () => {
  return axios.get(getUrl('EUR', 'AUD'))
}

// get real time currency exchange rate of AUD/USD
const getExchangeRateAUDUSD = () => {
  return axios.get(getUrl('AUD', 'USD'))
}

// get real time currency exchange rate of GBP/USD
const getExchangeRateGBPUSD = () => {
  return axios.get(getUrl('GBP', 'USD'))
}

// get real time currency exchange rate of USD/CNH
const getExchangeRateUSDCNH = () => {
  return axios.get(getUrl('USD', 'CNH'))
}

// get real time currency exchange rate of EUR/JPY
const getExchangeRateEURJPY = () => {
  return axios.get(getUrl('EUR', 'JPY'))
}

// get real time currency exchange rate of AUD/NZD
const getExchangeRateAUDNZD = () => {
  return axios.get(getUrl('AUD', 'NZD'))
}

// get real time currency exchange rate of USD/JPY
const getExchangeRateUSDJPY = () => {
  return axios.get(getUrl('USD', 'JPY'))
}

// get real time currency exchange rate of USD/MXN
const getExchangeRateUSDMXN = () => {
  return axios.get(getUrl('USD', 'MXN'))
}

// get all the exchange rates by calling the above functions in promise.all
const getAllExchangeRatesOfForex = () => {
  return axios.get(allForexEndpoints)
}

module.exports = {
  getExchangeRateAUDNZD,
  getExchangeRateAUDUSD,
  getExchangeRateEURAUD,
  getExchangeRateEURGBP,
  getExchangeRateEURJPY,
  getExchangeRateEURUSD,
  getExchangeRateGBPUSD,
  getExchangeRateUSDCNH,
  getExchangeRateUSDMXN,
  getExchangeRateUSDJPY,
  getAllExchangeRatesOfForex,
}
