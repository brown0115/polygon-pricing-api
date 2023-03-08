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
} = require('../services/forex')
const { listOfForex } = require('../util')

// Route: /stocks
module.exports.getExchangeRatesOfForex = async (_, res) => {
  try {
    //fetch data
    // alpha vantage crypto currency exchange rate
    const respPolygonForex = await getAllExchangeRatesOfForex()
    const { tickers } = respPolygonForex && respPolygonForex.data
    const dataPolygonForex = []
    FOREX.map((frx) => {
      const labelString = `C:${frx.toUpperCase()}USD`
      tickers.map((item) => {
        const { ticker, todaysChangePerc, day, lastQuote } = item
        const { a, t } = lastQuote
        if (ticker === labelString) {
          const label = `${frx.toUpperCase()}/USD`
          dataPolygonForex.push({
            [label]: a,
            changes_24hrs: todaysChangePerc,
            last_refreshed: new Date(t),
          })
        }
      })
    })
    res.status(200).json(dataPolygonForex)
  } catch (err) {
    console.log(err)
  }
}

// get specific forex currency exchange rate
// Route: /forex/:name

module.exports.getExchangeRateOfForexByName = async (req, res) => {
  const { name } = req.params

  const getSpecificForex = async (name) => {
    switch (name.toLowerCase()) {
      case 'aud-nzd':
        return await getExchangeRateAUDNZD()
      case 'aud-usd':
        return await getExchangeRateAUDUSD()
      case 'eur-aud':
        return await getExchangeRateEURAUD()
      case 'eur-gbp':
        return await getExchangeRateEURGBP()
      case 'eur-jpy':
        return await getExchangeRateEURJPY()
      case 'eur-usd':
        return await getExchangeRateEURUSD()
      case 'gbp-usd':
        return await getExchangeRateGBPUSD()
      case 'usd-cnh':
        return await getExchangeRateUSDCNH()
      case 'usd-mxn':
        return await getExchangeRateUSDMXN()
      case 'usd-jpy':
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
        message: 'not found',
      })
    } else {
      const resp = await getSpecificForex(name)
      const newData = resp?.data
      const { last, symbol } = newData

      res.status(200).json({
        success: true,
        [symbol]: last.bid,
        last_refreshed: new Date(last.timestamp),
      })
    }
  } catch (err) {
    console.log(err)
  }
}

const FOREX = ['eur', 'aud', 'gbp', 'cnh', 'jpy', 'mxn']
