const axios = require("axios")

const getCryptoAndStocksUrl = (func, symbol, interval) => {
	return `https://www.alphavantage.co/query?function=${func}&symbol=${symbol}&market=USD&interval=${interval}&apikey=${process.env.API_KEY}`
}

const getForexUrl = (symbol, interval) => {
	return `https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=${symbol}&to_symbol=USD&interval=${interval}&apikey=${process.env.API_KEY}`
}

// get specific crypto currency OHCL data
module.exports.getCryptoOHCL = (symbol, interval) => {
	return axios.get(getCryptoAndStocksUrl("CRYPTO_INTRADAY", symbol, interval))
}

// get specific forex currency OHCL data
module.exports.getForexOHCL = (symbol, interval) => {
	return axios.get(getForexUrl(symbol, interval))
}

// get specific stocks currency OHCL data
module.exports.getStocksOHCL = (symbol, interval) => {
	return axios.get(getCryptoAndStocksUrl("TIME_SERIES_INTRADAY", symbol, interval))
}
