const moment = require("moment")

module.exports.listOfCrypto = [
	"BTC",
	"ETH",
	"LTC",
	"XLM",
	"ADA",
	"NEO",
	"EOS",
	"IOTA",
	"SOL",
	"VET",
	"MATIC",
	"DOT",
	"AXS",
	"UNI",
	"LINK",
	"FIL",
]

module.exports.listOfForex = [
	"EUR-USD",
	"EUR-GBP",
	"EUR-AUD",
	"AUD-USD",
	"GBP-USD",
	"USD-CNH",
	"EUR-JPY",
	"AUD-NZD",
	"USD-JPY",
	"USD-MXN",
]

module.exports.intervals = ["1min", "5min", "15min", "30min", "60min"]

module.exports.convertUnixToGMT = unixTime => {
	return moment(new Date(Number(unixTime?.toString().slice(0, 10) * 1000))).format("YYYY-MM-DD HH:mm:ss")
}
