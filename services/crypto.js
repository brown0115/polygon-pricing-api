const axios = require("axios")

const getUrl = fromCurrency => {
	return `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrency}&to_currency=USD&apikey=${process.env.API_KEY}`
}

const allCryptoEndpoints = `https://api.polygon.io/v2/snapshot/locale/global/markets/crypto/tickers?apiKey=${process.env.STOCKS_API_KEY}`

//get real time currency exchange rate of BTC
const getExchangeRateBTC = async () => {
	return axios.get(getUrl("BTC"))
}

//get real time currency exchange rate of ETH
const getExchangeRateETH = () => {
	return axios.get(getUrl("ETH"))
}

//get real time currency exchange rate of LTC
const getExchangeRateLTC = () => {
	return axios.get(getUrl("LTC"))
}

//get real time currency exchange rate of XLM
const getExchangeRateXLM = () => {
	return axios.get(getUrl("XLM"))
}

//get real time currency exchange rate of ADA
const getExchangeRateADA = () => {
	return axios.get(getUrl("ADA"))
}

//get real time currency exchange rate of NEO
const getExchangeRateNEO = () => {
	return axios.get(getUrl("NEO"))
}

//get real time currency exchange rate of EOS
const getExchangeRateEOS = () => {
	return axios.get(getUrl("EOS"))
}

//get real time currency exchange rate of IOT
const getExchangeRateIOTA = () => {
	return axios.get(getUrl("IOTA"))
}

//get real time currency exchange rate of Solana
const getExchangeRateSOL = () => {
	return axios.get(getUrl("SOL"))
}

//get real time currency exchange rate of VeChain
const getExchangeRateVET = () => {
	return axios.get(getUrl("VET"))
}

//get real time currency exchange rate of Polygon
const getExchangeRateMATIC = () => {
	return axios.get(getUrl("MATIC"))
}

//get real time currency exchange rate of polkadot
const getExchangeRateDOT = () => {
	return axios.get(getUrl("DOT"))
}

//get real time currency exchange rate of Axie Infinity
const getExchangeRateAXS = () => {
	return axios.get(getUrl("AXS"))
}

//get real time currency exchange rate of UniSwap
const getExchangeRateUNI = () => {
	return axios.get(getUrl("UNI"))
}

//get real time currency exchange rate of Chainlink
const getExchangeRateLINK = () => {
	return axios.get(getUrl("LINK"))
}

//get real time currency exchange rate of Filecoin
const getExchangeRateFIL = () => {
	return axios.get(getUrl("FIL"))
}

// get all crypto currency exchange rate
const getAllCryptoExchangeRate = () => {
	return axios.get(allCryptoEndpoints);
}

module.exports = {
	getExchangeRateBTC,
	getExchangeRateETH,
	getExchangeRateLTC,
	getExchangeRateXLM,
	getExchangeRateADA,
	getExchangeRateNEO,
	getExchangeRateEOS,
	getExchangeRateIOTA,
	getExchangeRateSOL,
	getExchangeRateVET,
	getExchangeRateMATIC,
	getExchangeRateDOT,
	getExchangeRateAXS,
	getExchangeRateUNI,
	getExchangeRateLINK,
	getExchangeRateFIL,
	getAllCryptoExchangeRate,
}
