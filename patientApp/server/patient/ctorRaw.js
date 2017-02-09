import eutil from 'ethereumjs-util';
import etx from 'ethereumjs-tx';
import keyPair from '../keyPair.js';
import encodeConstructorParams from '../encodeConstructorParams.js';
import web3 from '../web3.js';
import abiAndByteCode from './abiAndByteCode.js'
//import getNonce from '../getNonce.js';

var nonce = web3.eth.getTransactionCount(keyPair.address, 'pending');

/*
Example of calculating the address for a new contract deplopyment
Tim Coulter @tcoulter 10:54
var senderAddress = “0xabcd…”;

// The nonce of the transaction that will make this contract == the number of transactions
// the sender address has made at this point in time. You can get that through:
var nonce;
web3.eth.getTransactionCount(senderAddress, function(err, n) {
  nonce = n;
})

// Then rlp encode the address and nonce as an array. I forget the exact ethereumjs-util syntax:
// PS: both senderAddress and nonce may need to be turned into their hex or buffer versions to make ethereumjs happy.
var encoded = util.rlpEncode([senderAddress, nonce])

// Then you can sha3 the encoded value in web3
var hash = web3.sha3(encoded);

// Finally, get the first 40 characters, including 2 for the 0x prefix
var address_of_contract = hash.substring(0, 42);
*/


// Example of how to invoke methods with sendRawTransaction
// https://github.com/ether-camp/wallet/blob/master/app/public/src/contracts/wallet.js
// https://forum.ethereum.org/discussion/5039/how-to-use-web3-js-to-sign-a-contract-call
export default function() {
  var args = [
  ];

  const contract = web3.eth.contract(abiAndByteCode.abi);
  const contractData = contract.new.getData({
    data: abiAndByteCode.byteCode
  });

  //console.log('contractData:', contractData);

  var ctorParamsAsBytes = encodeConstructorParams(abiAndByteCode.abi, args);

  var txData = contractData + ctorParamsAsBytes;

  //console.log('nonce=', nonce);

  var tx = new etx({
    to: null,
    nonce: nonce++,
    gasLimit: 4700000,//web3.toHex(4700000),
    gasPrice: 20000000000,//web3.toHex(20000000000),
    data: txData,
  });
  tx.sign(Buffer.from(keyPair.privateKey.substr(2), 'hex'));

  var p = new Promise((resolve, reject) => {
    web3.eth.sendRawTransaction('0x' + tx.serialize().toString('hex'), function(err, transactionHash) {
      if (!err) {
        console.log('transactionId:', transactionHash);
        resolve(transactionHash);
      }
    });
  });

  return p;
}
