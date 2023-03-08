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
  getOneCryptoExchangeRate
} = require('../services/crypto')
const { listOfCrypto } = require('../util')

//get exchange rate of all cryptos listed
// Route: /cryptos

async function getCertainExchangerateOfCrypto(string){
  return await getOneCryptoExchangeRate(string);
}

module.exports.getExchangeRateOfCrypto = async (_, res) => {
  try {
    //fetch data
    // polygon api crypto currency exchange rate
    //const respPolygonCrypto = await getAllCryptoExchangeRate()
    //const { tickers } = respPolygonCrypto && respPolygonCrypto.data
    const dataPolygonCrypto = []
    CRYPTOS.map((crp) => {
      const labelString = `X:${crp.toUpperCase()}USD`
      console.log(labelString);
      getCertainExchangerateOfCrypto(labelString).then((data)=>{
        //console.log(data);
        //console.log(data.data);
        const { ticker, todaysChangePerc, lastTrade } = data.data.ticker;
        //console.log(lastTrade);
        const { p, t } = lastTrade
        if (ticker === labelString) {
          const label = `${crp.toUpperCase()}/USD`
          dataPolygonCrypto.push({
            [label]: p,
            changes_24hrs: todaysChangePerc,
            last_refreshed: new Date(t),
          })
        }
      })
    })
    res.status(200).json(dataPolygonCrypto)
  } catch (err) {
    console.log(err)
  }
}

// get specific crypto currency exchange rate
// Route: /crypto/:name

module.exports.getExchangeRateOfCryptoByName = async (req, res) => {
  const { name } = req.params

  const getSpecificCrypto = async (name) => {
    switch (name.toLowerCase()) {
      case 'btc':
        return await getExchangeRateBTC()
      case 'eth':
        return await getExchangeRateETH()
      case 'ltc':
        return await getExchangeRateLTC()
      case 'xlm':
        return await getExchangeRateXLM()
      case 'ada':
        return await getExchangeRateADA()
      case 'neo':
        return await getExchangeRateNEO()
      case 'eos':
        return await getExchangeRateEOS()
      case 'iota':
        return await getExchangeRateIOTA()
      case 'sol':
        return await getExchangeRateSOL()
      case 'vet':
        return await getExchangeRateVET()
      case 'matic':
        return await getExchangeRateMATIC()
      case 'dot':
        return await getExchangeRateDOT()
      case 'axs':
        return await getExchangeRateAXS()
      case 'uni':
        return await getExchangeRateUNI()
      case 'link':
        return await getExchangeRateLINK()
      case 'fil':
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
        message: 'not found',
      })
    } else {
      const respPolygonCrypto = await getSpecificCrypto(name)
      const newData = respPolygonCrypto?.data
      const { last } = newData
      const symbol = newData.symbol.replace('-', '/')

      res.status(200).json({
        success: true,
        [symbol]: last.price,
        last_refreshed: new Date(last.timestamp),
      })
    }
  } catch (err) {
    console.log(err)
  }
}

const CRYPTOS = [
  'btc',
  'eth',
  'ltc',
  'xlm',
  'ada',
  'neo',
  'eos',
  'iot',
  'sol',
  'vet',
  'matic',
  'dot',
  'axs',
  'uni',
  'link',
  'fil',
]
