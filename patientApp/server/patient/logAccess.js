import eutil from 'ethereumjs-util';
import etx from 'ethereumjs-tx';
import keyPair from '../keyPair.js';
//import encodeConstructorParams from '../encodeConstructorParams.js';
import web3 from '../web3.js';
import abiAndByteCode from './abiAndByteCode.js'
//import getNonce from '../getNonce.js';
import SolidityFunction from 'web3/lib/web3/function';
//import _ from lodash;

//var Patient = web3.eth.contract(abiAndByteCode.abi);

//console.log(_);

// Example of how to invoke methods with sendRawTransaction
// https://github.com/ether-camp/wallet/blob/master/app/public/src/contracts/wallet.js
// https://forum.ethereum.org/discussion/5039/how-to-use-web3-js-to-sign-a-contract-call
export default function(contractAddress, address) {

  var func = new SolidityFunction(web3, abiAndByteCode.abi[1]);

  //console.log(func);

  var data = func.toPayload([address]).data;

  console.log(data);

  var txData = data;

  var nonce = web3.eth.getTransactionCount(keyPair.address, 'pending')

  //console.log('nonce=', nonce);

  var tx = new etx({
    to: contractAddress,
    nonce: nonce,
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
