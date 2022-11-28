const { getOHCL, getCryptoOHCL, getStocksOHCL, getForexOHCL } = require("../services/ohcl")

// get specific crypto currency OHCL data
// Route: /crypto/:symbol/:interval
//CRYPTO

module.exports.getSpecificCryptoOHCL = async (req, res) => {
	try {
		const { symbol, interval } = req.params
		const resp = await getCryptoOHCL(symbol, interval)
		if (resp.data["Error Message"]) {
			res.status(404).json({
				success: false,
				message: "not found",
			})
		} else {
			const data = resp.data["Time Series Crypto (" + interval + ")"]
			const dataArr = Object.entries(data).map(item => {
				return {
					time: item[0],
					open: item[1]["1. open"],
					high: item[1]["2. high"],
					low: item[1]["3. low"],
					close: item[1]["4. close"],
					volume: item[1]["5. volume"],
				}
			})
			res.status(200).json(dataArr)
		}
	} catch (err) {
		console.log(err)
	}
}

// get specific stock currency OHCL data
// Route: /ohcl/stock/:symbol/:interval
// STOCK
module.exports.getSpecificStocksOHCL = async (req, res) => {
	try {
		const { symbol, interval } = req.params
		const resp = await getStocksOHCL(symbol, interval)
		if (resp.data["Error Message"]) {
			res.status(404).json({
				success: false,
				message: "not found",
			})
		} else {
			const data = resp.data["Time Series (" + interval + ")"]
			const dataArr = Object.entries(data).map(item => {
				return {
					time: item[0],
					open: item[1]["1. open"],
					high: item[1]["2. high"],
					low: item[1]["3. low"],
					close: item[1]["4. close"],
					volume: item[1]["5. volume"],
				}
			})
			res.status(200).json(dataArr)
		}
	} catch (err) {
		console.log(err)
	}
}

// get specific forex currency OHCL data
// Route: /ohcl/forex/:symbol/:interval
// FOREX
module.exports.getSpecificForexOHCL = async (req, res) => {
	try {
		const { symbol, interval } = req.params
		const resp = await getForexOHCL(symbol, interval)
		if (resp.data["Error Message"]) {
			res.status(404).json({
				success: false,
				message: "not found",
			})
		} else {
			const data = resp.data["Time Series FX (" + interval + ")"]
			const dataArr = Object.entries(data).map(item => {
				return {
					time: item[0],
					open: item[1]["1. open"],
					high: item[1]["2. high"],
					low: item[1]["3. low"],
					close: item[1]["4. close"],
					volume: item[1]["5. volume"],
				}
			})
			res.status(200).json(dataArr)
		}
	} catch (err) {
		console.log(err)
	}
}
