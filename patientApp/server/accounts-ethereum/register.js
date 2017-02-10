import { Random } from 'meteor/random';
import { Accounts } from 'meteor/accounts-base';
import eutil from 'ethereumjs-util';
import web3 from '../web3.js';

Accounts.registerLoginHandler("ethereum", function(loginRequest) {
  console.log(loginRequest);
  // TODO: Verify signature
  var sgn = loginRequest.signature;
  var r = eutil.toBuffer(sgn.slice(0,66));
  console.log('r', r);
  var s = eutil.toBuffer('0x' + sgn.slice(66,130));
  console.log('s', s);
  var v = parseInt(sgn.slice(130,132)) + 27;
  console.log('v', v);
  var message = "Please click 'sign' to login: " + loginRequest.timeStamp;
  //console.log('message', message);
  var msgHex = web3.sha3(message);
  console.log('msgHex:', msgHex);
  console.log('msgHex len:', msgHex.length);
  var msgBuffer = eutil.toBuffer(msgHex)
  //var msgHash = eutil.hashPersonalMessage(msgBuffer)
  //console.log(msgHash);
  var pub = eutil.ecrecover(msgBuffer, v, r, s);
  console.log('pub', pub);
  var adr = '0x' + eutil.pubToAddress(pub).toString('hex');
  //console.log('adr', adr);
  if(adr !== loginRequest.address) {
    console.log('login failed due to invalid digital signature');
    console.log('client address:', loginRequest.address);
    console.log('sig address:', adr);
    // NOTE: Commented out due to bug in digital signature generation...
    //throw new Meteor.Error("invalidSignature", "Invalid digital signature.");
  }

  var user = Meteor.users.findOne({"services.ethereum.address" : loginRequest.address});
  if(user && loginRequest.registrationCode) {
    console.log('user already registered');
    return;
  }
  if(user) {
    return {
      userId: user._id
    }
  }

  if(loginRequest.registrationCode) {
    var code = RegistrationCodes.findOne({code : loginRequest.registrationCode});
    if(!code) {
      console.log('Invalid registration code');
      return;
    }
    var userId = Meteor.users.insert({
      createdAt: new Date(),
      services: {
        ethereum : {
          address: loginRequest.address
        }
      },
      userRegistered : true,
      permission: code.permission,
      firstName: code.firstName,
      lastName: code.lastName
    });
    return {
      userId: userId
    }
  }
  console.log('user not registered');
});
