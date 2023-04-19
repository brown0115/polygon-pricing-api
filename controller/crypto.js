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
} = require('../services/crypto')
const { listOfCrypto } = require('../util')

//get exchange rate of all cryptos listed
// Route: /cryptos

module.exports.getExchangeRateOfCrypto = async (_, res) => {
  try {
    //fetch data
    // polygon api crypto currency exchange rate
    const respPolygonCrypto = await getAllCryptoExchangeRate()
    const { tickers } = respPolygonCrypto && respPolygonCrypto.data
    const dataPolygonCrypto = []
    CRYPTOS.map((crp) => {
      const labelString = `X:${crp.toUpperCase()}USD`
      tickers.map((item) => {
        const { ticker, todaysChangePerc, lastTrade } = item
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

// get crypto prices by number

module.exports.getExchangeRateOfCryptoByNumber = async (req, res) => {
  const { name } = req.params

  const getSpecificCrypto = async (name) => {
    switch (name) {
      case '0':
        return await getExchangeRateBTC()
      case '1':
        return await getExchangeRateETH()
      case '2':
        return await getExchangeRateLTC()
      case '3':
        return await getExchangeRateXLM()
      case '4':
        return await getExchangeRateADA()
      case '5':
        return await getExchangeRateNEO()
      case '6':
        return await getExchangeRateEOS()
      case '7':
        return await getExchangeRateIOTA()
      case '8':
        return await getExchangeRateSOL()
      case '9':
        return await getExchangeRateVET()
      case '10':
        return await getExchangeRateMATIC()
      case '11':
        return await getExchangeRateDOT()
      case '12':
        return await getExchangeRateAXS()
      case '13':
        return await getExchangeRateUNI()
      case 'l4':
        return await getExchangeRateLINK()
      case '15':
        return await getExchangeRateFIL()
      default:
        return null
    }
  }

  try {
    //fetch data
    // alpha vantage crypto currency exchange rate
      const respPolygonCrypto = await getSpecificCrypto(name)
      const newData = respPolygonCrypto?.data
      const { last } = newData
      // const symbol = newData.symbol.replace('-', '/')

      res.status(200).json({
        price: last.price
      })
    
  } catch (err) {
    console.log(err)
  }
}


module.exports.getArrayPrices = async (req, res) => {
  const assetArray = req.body;
  let priceArray = [];

  if (Array.isArray(assetArray)) {
    for (let i = 0; i < assetArray.length; i++) {
      let price;
      let newData;
      let last;
      switch (assetArray[i]) {
        case '0':
          price = await getExchangeRateBTC();
          newData = price?.data;
          ({ last } = newData);
          priceArray.push(last.price);
          break;
        case '1':
          price = await getExchangeRateETH();
          newData = price?.data;
          ({ last } = newData);
          priceArray.push(last.price);
          break;
        case '2':
          price = await getExchangeRateLTC();
          newData = price?.data;
          ({ last } = newData);
          priceArray.push(last.price);
          break;
        case '3':
          price = await getExchangeRateXLM();
          newData = price?.data;
          ({ last } = newData);
          priceArray.push(last.price);
          break;
        case '4':
          price = await getExchangeRateADA();
          priceArray.push(price);
          break;
        case '5':
          price = await getExchangeRateNEO();
          priceArray.push(price);
          break;
        case '6':
          price = await getExchangeRateEOS();
          newData = price?.data;
          ({ last } = newData);
          priceArray.push(last.price);
          break;
        case '7':
          price = await getExchangeRateIOTA();
          priceArray.push(price);
          break;
        case '8':
          price = await getExchangeRateSOL();
          newData = price?.data;
          ({ last } = newData);
          priceArray.push(last.price);
          break;
        case '9':
          price = await getExchangeRateVET();
          priceArray.push(price);
          break;
        case '10':
          price = await getExchangeRateMATIC();
          newData = price?.data;
          ({ last } = newData);
          priceArray.push(last.price);
          break;
        case '11':
          price = await getExchangeRateDOT();
          newData = price?.data;
          ({ last } = newData);
          priceArray.push(last.price);
          break;
        case '12':
          price = await getExchangeRateAXS();
          newData = price?.data;
          ({ last } = newData);
          priceArray.push(last.price);
          break;
        case '13':
          price = await getExchangeRateUNI();
          newData = price?.data;
          ({ last } = newData);
          priceArray.push(last.price);
          break;
        case '14':
          price = await getExchangeRateLINK();
          newData = price?.data;
          ({ last } = newData);
          priceArray.push(last.price);
          break;
        case '15':
          price = await getExchangeRateFIL();
          newData = price?.data;
          ({ last } = newData);
          priceArray.push(last.price);
          break;
        default:
          break;
      }
    }
  } else {
    res.status(400).json({ error: 'Invalid input. Expected an array in the request body.' });
    return;
  }

  res.status(200).json({ priceArray });
};


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
