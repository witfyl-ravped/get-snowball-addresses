import logo from './logo.svg';
import './App.css';
import abi from './abi/abi.json'
import { ethers } from 'ethers';

const getEvents = async () => {

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  let logInfo = {
    address: '0x60B1A1EB0374861FE79CE946726dB1ffe2b6eC54',
    fromBlock: 1654739,
    toBlock: 1654739
  }

  provider.getLogs(logInfo).then((res) => console.log(res))
}

function App() {
  getEvents();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

  // const contractAddress = "0x60B1A1EB0374861FE79CE946726dB1ffe2b6eC54";

  // const contract = new ethers.Contract(contractAddress, abi, provider.getSigner(0));
  // let eventFilter = contract.filters.Deposit();
  // let events = await contract.queryFilter(eventFilter, -100);

  // console.log(events);  
  // console.log(contract);
  // await contract.getTransactionCount(true, true).then(count => console.log(count.toString()));