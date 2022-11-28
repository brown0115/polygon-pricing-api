//get exchange rate of all cryptos listed

const {
	getAllExchangeRatesOfForex,
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
} = require("../services/forex")
const { listOfForex } = require("../util")

// Route: /stocks
module.exports.getExchangeRatesOfForex = async (_, res) => {
	try {
		//fetch data
		// alpha vantage crypto currency exchange rate
		const resp = await getAllExchangeRatesOfForex()
		//prepare data
		// alpha vantange
		const refactorData = resp.map(item => {
			const newData = item.data["Realtime Currency Exchange Rate"]
			const symbol = newData["1. From_Currency Code"] + "/" + newData["3. To_Currency Code"]
			return {
				[symbol]: Number(newData["5. Exchange Rate"]),
				last_refreshed: newData["6. Last Refreshed"],
			}
		})

		res.status(200).json(refactorData)
	} catch (err) {
		console.log(err)
	}
}

// get specific forex currency exchange rate
// Route: /forex/:name

module.exports.getExchangeRateOfForexByName = async (req, res) => {
	const { name } = req.params

	const getSpecificForex = async name => {
		switch (name.toLowerCase()) {
			case "aud-nzd":
				return await getExchangeRateAUDNZD()
			case "aud-usd":
				return await getExchangeRateAUDUSD()
			case "eur-aud":
				return await getExchangeRateEURAUD()
			case "eur-gbp":
				return await getExchangeRateEURGBP()
			case "eur-jpy":
				return await getExchangeRateEURJPY()
			case "eur-usd":
				return await getExchangeRateEURUSD()
			case "gbp-usd":
				return await getExchangeRateGBPUSD()
			case "usd-cnh":
				return await getExchangeRateUSDCNH()
			case "usd-mxn":
				return await getExchangeRateUSDMXN()
			case "usd-jpy":
				return await getExchangeRateUSDJPY()
			default:
				return null
		}
	}

	try {
		//fetch data
		// alpha vantage crypto currency exchange rate
		if (!listOfForex.includes(name.toUpperCase())) {
			res.status(404).json({
				success: false,
				message: "not found",
			})
		} else {
			const resp = await getSpecificForex(name)
			const newData = resp?.data["Realtime Currency Exchange Rate"]
			const symbol = newData["1. From_Currency Code"] + "/" + newData["3. To_Currency Code"]

			res.status(200).json({
				success: true,
				[symbol]: Number(newData["5. Exchange Rate"]),
				last_refreshed: newData["6. Last Refreshed"],
			})
		}
	} catch (err) {
		console.log(err)
	}
}
