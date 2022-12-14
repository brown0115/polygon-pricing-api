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
		const respPolygonStocks = await getStocksValueOfAll()

		const { tickers } = respPolygonStocks && respPolygonStocks.data;
		const dataPolygonStocks = [];
		STOCKS.map((stc) => {
			tickers.map((item) => {
				const { ticker, todaysChangePerc, lastQuote} = item;
				const { p } = lastQuote;
				if (ticker === stc) {
					const label = stc;
					dataPolygonStocks.push({
						[label]: p,
						changes_24hrs: todaysChangePerc,
						last_refreshed: new Date()
					})

					return 0;
				}
			})
		})

		res.status(200).json(dataPolygonStocks)
	} catch (err) {
		res.status(404).json({
			success: false,
			message: "not found",
		})
	}
}


const STOCKS = ["TSLA", "AAPL", "AMZN", "MSFT", "SNAP", "AXP", "CSCO", "T", "DIS", "ABBV", "MMM", "JPM", "JNJ"]
