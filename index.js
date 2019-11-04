// Made by CharmoulaSfax
var express = require("express");
Object.defineProperty(global, '_bitcore', { get() { return undefined }, set() { } })
var app = express();
var request = require("request");
const bip39 = require('bip39')
const ethers = require('ethers');
var bitcoinjs = require('bitcoinjs-lib')
app.get("/setMnemonic/btc/:pkey", function (req, res) {
    var pkey = req.params.pkey;
    if (bip39.validateMnemonic(pkey)) {
   
        bitcoin(pkey, (btc) => {
            res.json({
                btc: btc,
            })

        });
    } else {
        res.send("mnemonic not valid")
    }
});

app.get("/setMnemonic/eth/:pkey", function (req, res) {
    var pkey = req.params.pkey;
    if (bip39.validateMnemonic(pkey)) {

        ether(pkey, (callback) => {
            res.json({
                eth: callback,
            })
        })
    } else {
        res.send("mnemonic not valid")
    }
});


/////////////////functions////////////////
function bitcoin(pkey, callback) {
    var seed = bip39.mnemonicToSeedSync(pkey);
    var master = bitcoinjs.bip32.fromSeed(seed, bitcoinjs.networks.bitcoin).derivePath("m/44'/0'/0'")
    let xpubString = master.neutered().toBase58()
    request('https://blockchain.info/multiaddr?active=' + xpubString, { json: true }, (err, res, body) => {
        if (typeof callback == 'function') {
            callback(body.addresses[0].final_balance / 100000000)
        }
    });
}
function ether(pkey, callback) {
    let provider = ethers.getDefaultProvider();
    let node = ethers.Wallet.fromMnemonic(pkey,"m/44'/60'/0'/0/0");

    let wallet = new ethers.Wallet(node.privateKey);
    const balance = provider.getBalance(wallet.address).then(data => {
        return callback(ethers.utils.formatEther(data))
    }
    );
}
app.listen(8000, function () {
    console.log("sever running on 8000");
});

