require('dotenv').config()
const cors = require('cors')
const express = require('express')
const { createServer } = require('http') // you can use https as well
const socketIo = require('socket.io')
const bodyParser = require('body-parser')

//app
const app = express()

const server = createServer(app)
const io = socketIo(server, {
  cors: {
    origin: `${process.env.CORS_ORIGIN}`,
    methods: ['GET', 'POST'],
  },
})
const Polygon = require('./util/polygon')

const corsOptions = {
  origin: `${process.env.CORS_ORIGIN}`
}
app.use(cors())

//middleware
app.use(bodyParser.json())
app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept',
  )
  next()
})

io.on('connection', function (socket) {
  const clientCrypto = new Polygon({
    apiType: 'crypto',
    apiKey: process.env.STOCKS_API_KEY,
  })
  const clientForex = new Polygon({
    apiType: 'forex',
    apiKey: process.env.STOCKS_API_KEY,
  })
  const clientStocks = new Polygon({
    apiType: 'stocks',
    apiKey: process.env.STOCKS_API_KEY,
  })

  // subscribing to all channels for crypto
  clientCrypto.subscribe(['XT.*'])
  clientCrypto.on('XT', (trade) => {
    socket.emit('crypto_trade_data', trade)
  })

  clientCrypto.subscribe(['XA.*'])
  clientCrypto.on('XA', (ohlc) => {
    socket.emit('crypto_ohlc_data', ohlc)
  })

  // subscribing to all channels for forex
  clientForex.subscribe(['C.*'])
  clientForex.on('C', (trade) => {
    socket.emit('forex_trade_data', trade)
  })

  clientForex.subscribe(['CA.*'])
  clientForex.on('CA', (ohlc) => {
    socket.emit('forex_ohlc_data', ohlc)
  })

  // subscribing to all channels for stocks
  clientStocks.subscribe(['Q.*'])
  clientStocks.on('Q', (trade) => {
    socket.emit('stocks_trade_data', trade)
  })

  clientStocks.subscribe(['AM.*'])
  clientStocks.on('AM', (ohlc) => {
    socket.emit('stocks_ohlc_data', ohlc)
  })
})

//controllers
const {
  getExchangeRateOfCrypto,
  getExchangeRateOfCryptoByName,
} = require('./controller/crypto')
const {
  getSpecificCryptoOHCL,
  getSpecificStocksOHCL,
  getSpecificForexOHCL,
} = require('./controller/ohcl')
const {
  getExchangeRatesOfForex,
  getExchangeRateOfForexByName,
} = require('./controller/forex')
const {
  getSpecificStockPrice,
  getAllStocksPrice,
} = require('./controller/stocks')

//ROUTES
//crypto
app.get('/cryptos', getExchangeRateOfCrypto)
app.get('/crypto/:name', getExchangeRateOfCryptoByName)

//forex
app.get('/forex', getExchangeRatesOfForex)
app.get('/forex/:name', getExchangeRateOfForexByName)

//stocks
app.get('/stocks', getAllStocksPrice)
app.get('/stock/:symbol', getSpecificStockPrice)

//ohcl
app.get('/ohcl/crypto/:symbol/:interval', getSpecificCryptoOHCL)
app.get('/ohcl/stocks/:symbol/:interval', getSpecificStocksOHCL)
app.get('/ohcl/forex/:symbol/:interval', getSpecificForexOHCL)

const port = process.env.EA_PORT || 8080

server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
