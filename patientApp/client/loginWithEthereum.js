import eutil from 'ethereumjs-util';

// rabbit - rabbit@rebel.space

function checkSig(message) {
  var address = web3.eth.accounts[0];
  var msgHex = web3.sha3(message);
  web3.eth.sign(address, msgHex, function(err, signature) {

    var sgn = signature;
    var r = eutil.toBuffer(sgn.slice(0,66));
    var s = eutil.toBuffer('0x' + sgn.slice(66,130));
    var v = parseInt(sgn.slice(130,132)) + 27;
    var msgBuffer = eutil.toBuffer(msgHex)
    var pub = eutil.ecrecover(msgBuffer, v, r, s);
    var adr = '0x' + eutil.pubToAddress(pub).toString('hex');
    if(adr !== address) {
      console.log('signature check FAILED');
    } else {
      console.log('signature check succeess');
    }
  });
}

function test() {
  checkSig("Please click 'sign' to login: Y"); // fails
  checkSig("Please click 'sign' to login: Z"); // success
}

export default function(regCode, callback) {
  //test();
  //return;
  console.log('regCode:', regCode);
  var loginRequest = {};
  if(regCode) {
    loginRequest.registrationCode = regCode;
  }

  loginRequest.address = web3.eth.accounts[0];
  //loginRequest.timeStamp = ' Thu Feb 09 2017 17:42:34 GMT-0600 (CST)';//(new Date()).toString();
  //loginRequest.timeStamp = ''; // fails
  //loginRequest.timeStamp = 'Y'; // fails
  //loginRequest.timeStamp = 'Z';// succeeds
  loginRequest.timeStamp = (new Date()).getTime().toString();
  var message = "Please click 'sign' to login: " + loginRequest.timeStamp;
  //console.log('message',message);
  var msgHex = web3.sha3(message);
  console.log('msgHex', msgHex);
  //console.log('msgHex len:', msgHex.length);
  console.log(loginRequest);
  //console.log(web3);
  var res = web3.eth.sign(loginRequest.address, msgHex, function(err, signature) {
    if(err) {
      console.log('error signing:', err);
      return;
    }
    console.log(signature);
    loginRequest.signature = signature;

    //checkSig(loginRequest);


    //send the login request
    Accounts.callLoginMethod({
      methodArguments: [loginRequest],
      userCallback: callback
    });
  });
}
