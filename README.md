# mnemonic-balance
Node Module used to get Bitcoin and Ether balance of a given mnemonic (Bip39)
# Buy me a Coffee
114zmqyxgWvMeUhesaEKgqbpHympUjMzZy
# Getting Started
Downloading :
```js
git clone https://github.com/CharmoulaSfax/mnemonic-balance.git
```
Starting : 
```js
npm install
npm start
```
# Usage
Download our npm module :
```js
npm install mnemonic-balance
```
importing :
```js


var balance = require('mnemonic-balance');

```
Get Bitcoin Balance :
```js

const mnemonicKey = 'mnemonic'
balance.getBtcBalance(mnemonicKey).then(balance => console.log(balance))
```
Get Eth Balance 
```js

const mnemonicKey = 'mnemonic'
balance.getEthBalance(mnemonicKey).then(balance => console.log(balance))
```

