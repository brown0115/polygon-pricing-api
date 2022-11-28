const {
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
} = require("../services/crypto")
const { listOfCrypto } = require("../util")

//get exchange rate of all cryptos listed
// Route: /cryptos

module.exports.getExchangeRateOfCrypto = async (_, res) => {
	try {
		//fetch data
		// alpha vantage crypto currency exchange rate
		const respAlphaCrypto = await getAllCryptoExchangeRate()
		//prepare data
		// alpha vantange
		const dataAlphaCrypto = respAlphaCrypto.map(item => {
			const newData = item.data["Realtime Currency Exchange Rate"]
			const symbol = newData["1. From_Currency Code"] + "/" + newData["3. To_Currency Code"]
			return {
				[symbol]: Number(newData["5. Exchange Rate"]),
				last_refreshed: newData["6. Last Refreshed"],
			}
		})

		res.status(200).json(dataAlphaCrypto)
	} catch (err) {
		console.log(err)
	}
}

// get specific crypto currency exchange rate
// Route: /crypto/:name

module.exports.getExchangeRateOfCryptoByName = async (req, res) => {
	const { name } = req.params

	const getSpecificCrypto = async name => {
		switch (name.toLowerCase()) {
			case "btc":
				return await getExchangeRateBTC()
			case "eth":
				return await getExchangeRateETH()
			case "ltc":
				return await getExchangeRateLTC()
			case "xlm":
				return await getExchangeRateXLM()
			case "ada":
				return await getExchangeRateADA()
			case "neo":
				return await getExchangeRateNEO()
			case "eos":
				return await getExchangeRateEOS()
			case "iota":
				return await getExchangeRateIOTA()
			case "sol":
				return await getExchangeRateSOL()
			case "vet":
				return await getExchangeRateVET()
			case "matic":
				return await getExchangeRateMATIC()
			case "dot":
				return await getExchangeRateDOT()
			case "axs":
				return await getExchangeRateAXS()
			case "uni":
				return await getExchangeRateUNI()
			case "link":
				return await getExchangeRateLINK()
			case "fil":
				return await getExchangeRateFIL()
			default:
				return null
		}
	}

	try {
		//fetch data
		// alpha vantage crypto currency exchange rate
		if (!listOfCrypto.includes(name.toUpperCase())) {
			res.status(404).json({
				success: false,
				message: "not found",
			})
		} else {
			const respAlphaCrypto = await getSpecificCrypto(name)
			const newData = respAlphaCrypto?.data["Realtime Currency Exchange Rate"]
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
