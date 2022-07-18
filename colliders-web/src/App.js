/*tslint:disabled*/

import { useEffect, useState } from 'react';
import { Fragment, useRef } from 'react';
import './App.css';
import { ethers } from 'ethers';
import abi from './contracts/COLLIDERS_abi.json';
import './components/Mint.css';

import Jumbotron from './components/Jumbotron';

import TotalSupply from './components/TotalSupply'
import YourNFTs from './components/YourNFTs'

const contractAddress = '0x9F1De126eC55EF16D256f30552911C4Ee6DD20A5';


function App() {

  // Constants
  const MINT_PRICE = 5;
  // UI state
  const [mintQuantity, setMintQuantity] = useState(10)
  const mintQuantityInputRef = useRef()


  const [totalSupply, getTotalSupplyFromChild] = useState(0);

  const totalSupplyHandle = (message) => {
    getTotalSupplyFromChild(message);
    console.log(message);
  };
  
  const [mintPaused, getmintingPausedChild] = useState(false);
  const mintingPausedHandle = (message) => {
    getmintingPausedChild(message);
    console.log(message);
  };

  const [currentAccount, setCurrentAccount] = useState(null);

  const checkWalletIsConnected = async () => {
    const { ethereum } = window;
  
    if (!ethereum) {
      console.log("Make sure you have Metamask installed!");
      return;
    } else {
      console.log("Wallet exists! We're ready to go!")
      const provider = new ethers.providers.Web3Provider(ethereum);
      //NETWORK IDENTIFIER
      const { chainId } = await provider.getNetwork();
      console.log(chainId) // 42
      if (chainId !== 250) {
        console.log("wrong network")
      } else {
        console.log("you are on chainID: " + chainId)
      }

    }

    const accounts = await ethereum.request({method: 'eth_accounts'});

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorised account: ", account);
      setCurrentAccount(account);

    } else {
      console.log("No authorised account was found");
    }
  }

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install Metamask!");
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts'});
      console.log("Found an account! Address: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err)
    }
  }

  const mintNftHandler = async () => {
    // console.log(totalMinted);
    try {
      const { ethereum } = window;

      if (ethereum) {
        // get a provider
        const provider = new ethers.providers.Web3Provider(ethereum);
        // get the signing party
        const signer = provider.getSigner();
        // connect to contract using ABI
        const nftContract = new ethers.Contract(contractAddress, abi, signer);

        // get the required price based on amount
        let price = mintQuantity * MINT_PRICE;
        // prepare mint tx
        let nftTX = await nftContract.mintNFT(mintQuantity, {value: ethers.utils.parseEther(price.toString()) });
        // await blockchain confirmation
        await nftTX.wait();

        console.log(`Mined, see transaction: https://testnet.ftmscan.com/tx/${nftTX.hash}`);
      } else {
        console.log("Ethereum object does not exist");
      }
    } catch (err) {
      console.log(err);
      alert("For whatever reason, we could not process the transaction. Do you have enough funds?")
    }
  }


  const connectWalletButton = () => {
    return (
      <div className='mintForm'>
        <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
          Connect Wallet
        </button>
      </div>
    )
  }

  // function handleChange(event) {
  //   setNoMint(event.target.value);
  // }

  const mintNftButton = () => {
    return (
      <div className='mintForm'>
        <input
          // className={ ! mintError ? "border p-4 text-center rounded-tl rounded-bl focus:outline-none focus:border-blue-600 w-2/3" : "border border-red-500 p-4 text-center rounded-tl rounded-bl focus:outline-none focus:border-blue-600 w-2/3"}
          onChange={ e => setMintQuantity(e.target.value)}
          value={mintQuantity}
          placeholder="10"
          type="number"
          min="1"
          max="10"
          ref={mintQuantityInputRef}
        />
      
        <button onClick={mintNftHandler} className='cta-button mint-nft-button'>
          Mint NFT
        </button>
      </div>
    )
  }

  const mintPausedButton = () => {
    return (
      <div className='mintForm'>
        <input
          // className={ ! mintError ? "border p-4 text-center rounded-tl rounded-bl focus:outline-none focus:border-blue-600 w-2/3" : "border border-red-500 p-4 text-center rounded-tl rounded-bl focus:outline-none focus:border-blue-600 w-2/3"}
          onChange={ e => setMintQuantity(e.target.value)}
          value={mintQuantity}
          placeholder="1"
          type="number"
          min="1"
          max="10"
          ref={mintQuantityInputRef}
          disabled
        />
      
        <button className='cta-button mint-disabled-button'>
          Minting is not live!
        </button>
      </div>
    )
  }



  useEffect(() => {
    checkWalletIsConnected();
  }, [])

  return (
    <Fragment>
      <head>
        <title>COLLIDERS</title>
        <meta name="description" content="Mint a COLLIDER, a collection on FTM." />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <main>
        <Jumbotron/>
        <section className='mint' id='Mint'>
            <div className='mint-container'>
                <h2>Mint your COLLIDER</h2>
                <p>
                    COLLIDERs cost 10FTM each.
                </p>
                <p>
                    You may mint 10 tokens per transaction and 15 tokens per wallet.
                </p>
                {currentAccount ? (mintPaused ? mintPausedButton() : mintNftButton()) : connectWalletButton()}
                <TotalSupply totalSupplyHandle={totalSupplyHandle} mintingPausedHandle={mintingPausedHandle}/>
                <hr/>
                <p>Contract Verified on FTMScan: <a rel="noreferrer" target="_blank" href='https://ftmscan.com/address/0xA04DaD521E73D8DF5dB20fe762F16EA3dfaCBfE8'>0xA04DaD521E73D8DF5dB20fe762F16EA3dfaCBfE8</a></p>
                <YourNFTs />
            </div>
        </section>
        
      </main>
      {/* <Footer /> */}
    </Fragment>
  )
  // return (
  //   <div className='main-app'>
  //     <h1>FTM BAYC</h1>
  //     <div>
  //     {currentAccount ? mintNftButton() : connectWalletButton()}
  //     </div>
  //   </div>
  // )
}

export default App;