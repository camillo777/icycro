var config = {}

//config.provider = 'https://evm-t3.cronos.org'
config.provider = 'https://evm.cronos.org'

config.icycroAddress = '0xAf2B637Ef8Acd55758dBc447EBB762EA7799193E'

config.icycroABI = [
    "function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)",
    "function token0() external view returns (address)",
    "function token1() external view returns (address)"
]

config.tokenABI = [
    {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "name": "",
          "type": "uint8"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "name": "balance",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "type": "function"
    }
  ]


config.mail = {}
config.mail.sendmail = truee
config.mail.host = 'smtp.sendgrid.net'
config.mail.port = 25
config.mail.username = 'apikey'
config.mail.from = 'camillo777@gmail.com'
config.mail.to = 'camillo777@gmail.com'

module.exports = config;