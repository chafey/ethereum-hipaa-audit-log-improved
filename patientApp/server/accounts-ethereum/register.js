import { Random } from 'meteor/random';
import { Accounts } from 'meteor/accounts-base';
import eutil from 'ethereumjs-util';
import web3 from '../web3.js';

Accounts.registerLoginHandler("ethereum", function(loginRequest) {
  console.log('ethereum login');
  //console.log(loginRequest);
  var sgn = loginRequest.signature;
  var r = eutil.toBuffer(sgn.slice(0,66));
  //console.log('r', r);
  var s = eutil.toBuffer('0x' + sgn.slice(66,130));
  //console.log('s', s);
  var v = eutil.bufferToInt(eutil.toBuffer('0x' + sgn.slice(130,132)))
  var vOld = parseInt(sgn.slice(130,132)) + 27;
  //console.log('v', v);
  var msg = "Please click 'sign' to login: " + loginRequest.timeStamp;
  var timeStamp = new Date(0);
  timeStamp.setUTCSeconds(loginRequest.timeStamp/1000);
  var now = new Date();
  //console.log('timeStamp', timeStamp);
  //console.log('now', now);
  var diff = now.getTime() - timeStamp.getTime();
  //console.log('diff =',diff);
  const maxDifferenceInSeconds = 30;
  if(Math.abs((diff / 1000) > maxDifferenceInSeconds)) {
    throw new Meteor.Error("invalidTimeStamp", "Time stamp is older than " + maxDifferenceInSeconds + " 30 seconds.");
  }
  var msgHashHex = web3.sha3(msg);
  //console.log('msgHashHex:', msgHashHex);
  //console.log('msgHashHex len:', msgHashHex.length);
  var msgBuffer = eutil.toBuffer(msgHashHex)
  var pub = eutil.ecrecover(msgBuffer, v, r, s);
  //console.log('pub', pub);
  var adr = '0x' + eutil.pubToAddress(pub).toString('hex');
  //console.log('adr', adr);
  if(adr !== loginRequest.address) {
    console.log('login failed due to invalid digital signature');
    console.log('client address:', loginRequest.address);
    console.log('sig address:', adr);
    throw new Meteor.Error("invalidSignature", "Invalid digital signature.");
  }

  var user = Meteor.users.findOne({"services.ethereum.address" : loginRequest.address});
  if(user && loginRequest.registrationCode) {
    console.log('user already registered');
    return;
  }
  if(user) {
    console.log('User login success!!');
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
