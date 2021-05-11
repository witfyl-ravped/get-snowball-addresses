var ethers = require('ethers');

const getAddresses = async () => {
const contractAddress = "0x60B1A1EB0374861FE79CE946726dB1ffe2b6eC54";
const provider = new ethers.providers.JsonRpcProvider("https://api.avax.network/ext/bc/C/rpc");
const currentBlock = await provider.getBlockNumber();
// const contract = new ethers.Contract(contractAddress, abi, provider.getSigner(0));
let addresses = [];

for(let i = 1426357; i < currentBlock; i += 512){    
    let logInfo = {
      address: '0x60B1A1EB0374861FE79CE946726dB1ffe2b6eC54',
      fromBlock: i - 512,
      toBlock: i
    }
  
    provider.getLogs(logInfo)
    .then(logs => {
        logs.forEach(log => addresses.push(log.topics[1]));
    })
}
console.log(addresses);

}

getAddresses();
