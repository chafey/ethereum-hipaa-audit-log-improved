

function doLogon(address, now, sig, callback) {
  var loginRequest = {
    timeStamp : now,
    address: address,
    signature: sig
  };

  //send the login request
  Accounts.callLoginMethod({
    methodArguments: [loginRequest],
    userCallback: callback
  });
}

function loginWithSignature(address, now,callback) {
  var message = "Please click 'sign' to login: " + now;
  //console.log(message);
  var msgHex = web3.sha3(message);
  //console.log(msgHex);
  web3.eth.sign(address, msgHex, function(err, result) {
    if(err) {
      console.log('error signing:', err);
      return;
    }
    //console.log(result);
    doLogon(address, now, result,callback);
  });
}

function loginWithoutSignature(address, now,callback) {
  doLogon(address, now,undefined,callback);
}

Meteor.loginWithEthereum = function(callback) {
  var address = web3.eth.accounts[0];
  var now = new Date();
  loginWithSignature(address,now,callback);
  //loginWithoutSignature(address,now,callback);
};
