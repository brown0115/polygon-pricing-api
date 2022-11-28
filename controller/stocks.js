const moment = require("moment")
const { getStocksValue, getStocksValueOfAll } = require("../services/stocks")
const { convertUnixToGMT } = require("../util")

// STOCK
// get specific stock data
// Route: /stocks/:symbol
module.exports.getSpecificStockPrice = async (req, res) => {
	try {
		const { symbol } = req.params
		const resp = await getStocksValue(symbol)
		const price = resp.data?.results?.p
		const time = convertUnixToGMT(resp?.data?.results?.t)
		res.status(200).json({
			success: true,
			price,
			time,
		})
	} catch (err) {
		res.status(404).json({
			success: false,
			message: "not found",
		})
	}
}

// get all stock prices
// Route: /stocks
module.exports.getAllStocksPrice = async (_, res) => {
	try {
		const resp = await getStocksValueOfAll()
		const prices = resp.map(r => {
			const result = r.data?.results
			return {
				[result?.T]: result?.p,
				time: convertUnixToGMT(result?.t),
			}
		})
		res.status(200).json({
			success: true,
			prices,
		})
	} catch (err) {
		res.status(404).json({
			success: false,
			message: "not found",
		})
	}
}
