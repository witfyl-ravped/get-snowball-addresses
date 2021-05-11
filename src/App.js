import './App.css';
import abi from './abi/abi.json'
import { ethers } from 'ethers';

let addresses = [];

const getEvents = async () => {
  const contractAddress = "0x60B1A1EB0374861FE79CE946726dB1ffe2b6eC54";
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const currentBlock = await provider.getBlockNumber();
  // const contract = new ethers.Contract(contractAddress, abi, provider.getSigner(0));

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
}

getEvents();

function App() {
  console.log(addresses);
  console.log(addresses.length);
  return (
    <div className="App">
      <header className="App-header">
        {addresses.map((address) => (
          <li>{address}</li>
        ))}
      </header>
    </div>
  );
}

export default App;