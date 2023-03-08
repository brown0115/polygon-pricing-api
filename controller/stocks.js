const moment = require("moment");
const {
  getStocksValue,
  getStocksValueOfAll,
  getOneStocksPrice,
} = require("../services/stocks");
const { convertUnixToGMT } = require("../util");

// STOCK
// get specific stock data
// Route: /stocks/:symbol

async function getCertainStocksPrice() {
  let result = [];
  result[0] = await getOneStocksPrice(STOCKS[0]);
  console.log(1)
  result[1] = await getOneStocksPrice(STOCKS[1]);
  console.log(2)
  result[2] = await getOneStocksPrice(STOCKS[2]);
  console.log(3)
  result[3] = await getOneStocksPrice(STOCKS[3]);
  console.log(4)
  result[4] = await getOneStocksPrice(STOCKS[4]);
  console.log(4)
  result[5] = await getOneStocksPrice(STOCKS[5]);
  console.log(4)
  result[6] = await getOneStocksPrice(STOCKS[6]);
  console.log(4)
  result[7] = await getOneStocksPrice(STOCKS[7]);
  console.log(4)
  result[8] = await getOneStocksPrice(STOCKS[8]);
  console.log(4)
  result[9] = await getOneStocksPrice(STOCKS[9]);
  console.log(4)
  result[10] = await getOneStocksPrice(STOCKS[10]);
  console.log(4)
  result[11] = await getOneStocksPrice(STOCKS[11]);
  console.log(4)
  result[12] = await getOneStocksPrice(STOCKS[12]);
  return result;
}
module.exports.getSpecificStockPrice = async (req, res) => {
  try {
    const { symbol } = req.params;
    const resp = await getStocksValue(symbol);
    const price = resp.data?.results?.p;
    const time = convertUnixToGMT(resp?.data?.results?.t);
    res.status(200).json({
      success: true,
      price,
      time,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};

// get all stock prices
// Route: /stocks
module.exports.getAllStocksPrice1 = async (_, res) => {
  try {
    console.log(1);
    const respPolygonStocks = await getStocksValueOfAll();
    console.log(2);
    const { tickers } = respPolygonStocks && respPolygonStocks.data;
    const dataPolygonStocks = [];

    tickers.map((item) => {
      const { ticker, todaysChangePerc, lastQuote } = item;
      const { p } = lastQuote;
      if (STOCKS.indexOf(ticker) !== -1) {
        const label = ticker;
        dataPolygonStocks.push({
          [label]: p,
          changes_24hrs: todaysChangePerc,
          last_refreshed: new Date(),
        });
        return 0;
      }
    });

    res.status(200).json(dataPolygonStocks);
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};

module.exports.getAllStocksPrice = async (_, res) => {
  try {
    // const respPolygonStocks = await getStocksValueOfAll();

    // const { tickers } = respPolygonStocks && respPolygonStocks.data;
    console.log(1);
    const dataPolygonStocks = [];
    const response = await getCertainStocksPrice();
    console.log(2);
    response.map((data) => {
      //console.log(data.data);
      const { ticker, todaysChangePerc, lastQuote } = data.data.ticker;
      const { p } = lastQuote;
      dataPolygonStocks.push({
        [ticker]: p,
        changes_24hrs: todaysChangePerc,
        last_refreshed: new Date(),
      });
    });
    res.status(200).json(dataPolygonStocks);
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};

const STOCKS = [
  "TSLA",
  "AAPL",
  "AMZN",
  "MSFT",
  "SNAP",
  "AXP",
  "CSCO",
  "T",
  "DIS",
  "ABBV",
  "MMM",
  "JPM",
  "JNJ",
];
