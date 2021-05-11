import abi from './abi/abi.json'
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

let addresses = [];

const blockLoop = async () => {
  const contractAddress = "0x60B1A1EB0374861FE79CE946726dB1ffe2b6eC54";
  const provider = new ethers.providers.JsonRpcProvider("https://api.avax.network/ext/bc/C/rpc");
  const currentBlock = await provider.getBlockNumber();
  const contract = new ethers.Contract(contractAddress, abi, provider.getSigner(0));

  console.log("starting loop");

  for(let i = 1426357; i < currentBlock; i += 512){    
    let logInfo = {
      address: '0x60B1A1EB0374861FE79CE946726dB1ffe2b6eC54',
      // fromBlock: 1659608,
      // toBlock: 1659609
      fromBlock: i - 512,
      toBlock: i
    }
  
    await provider.getLogs(logInfo)
    .then(logs => {
        // console.log(logs.map(log => contract.interface.parseLog(log)));
        logs.forEach(log => addresses.push(
          log.topics[1].slice(0, 2) + log.topics[1].slice(26)
          ));
        // console.log("pushed!");
        console.log("within loop", addresses);
        // addresses.push(logs.map(log => contract.interface.parseLog(log.forEach(txn => {return txn.args[0]}))))
    })
  }
  return addresses;
}

const Events = () => {
  const [uiArray, setUiArray] = useState(null);

  useEffect(() => {
    const startLoop = async () => {
      const newArray = await blockLoop();
      setUiArray(newArray);
    }
    console.log("before start loop", uiArray);
    startLoop();
    console.log("after start loop", uiArray);
  }, [uiArray]);

  // console.log("Loading");
  // await blockLoop();
  // console.log("Finished!");
  console.log(uiArray, "1");
  return (
    <div>
    {uiArray ? uiArray.map(address => <li>{address}</li>) : "Loading"}
    </div>
    )

}

const App = () => {
  return (
    <div>
      <Events />
    </div>
  );
}

export default App;