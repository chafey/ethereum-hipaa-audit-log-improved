import ctorRaw from './ctorRaw.js'
import logAccess from './logAccess.js'
import abiAndByteCode from './abiAndByteCode.js'

export default {
  new : ctorRaw,
  logAccess : logAccess,
  abi: abiAndByteCode.abi,
  byteCode: abiAndByteCode.byteCode
};
