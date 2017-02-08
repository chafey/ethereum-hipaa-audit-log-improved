import fs from 'fs';
import solc from 'solc';
import path from 'path';

const input = fs.readFileSync(path.resolve('../../../../../../.') + '/contracts/Patient.sol');
const output = solc.compile(input.toString(), 1);
var byteCode = '0x' + output.contracts[':Patient'].bytecode;
var abi = JSON.parse(output.contracts[':Patient'].interface);

export default {
  abi: abi,
  byteCode: byteCode
};
