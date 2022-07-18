import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { hasEthereum } from '../utils/ethereum'
import Minter from '../contracts/COLLIDERS_abi.json'

const ADDY = '0x9f1de126ec55ef16d256f30552911c4ee6dd20a5'

export default function TotalSupply( {totalSupplyHandle, mintingPausedHandle} ) {
    // UI state
    const [loading, setLoading] = useState(true)
    const [totalMinted, setTotalMinted] = useState(0)

    // Constants
    const TOTAL = 500;

    useEffect( function() {
        async function fetchTotals() {
            if(! hasEthereum()) {
                console.log('Install MetaMask')
                setLoading(false)
                return
            }
    
            await getTotalSupply()
        
            setLoading(false)
        }
        fetchTotals();
    });

    // Get total supply of tokens from smart contract
    async function getTotalSupply() {
        try {
            // Interact with contract
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const contract = new ethers.Contract(ADDY, Minter, provider)
            const totalSupplyDATA = await contract.totalSupply()
            const mintPausedDATA = await contract.paused()
            mintingPausedHandle(mintPausedDATA);
        
            setTotalMinted(totalSupplyDATA.toNumber());
        } catch(error) {
            console.log(error)
        }
    }
    totalSupplyHandle(totalMinted);
    return (
        <>
            <p>
                Tokens minted: { loading ? 'Loading...' : `${totalMinted}/${TOTAL}` }<br />
            </p>
        </>
    )
}

export function GetNumTotalSupply() {
    useEffect( function() {
        async function fetchTotals() {
            if(! hasEthereum()) {
                console.log('Install MetaMask')
                return
            }
    
            await getTotalSupply()
        }
        fetchTotals();
    });

    // Get total supply of tokens from smart contract
    async function getTotalSupply() {
        try {
            // Interact with contract
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const contract = new ethers.Contract(ADDY, Minter, provider)
            const data = await contract.totalSupply()
        
            return (data.toNumber());
        } catch(error) {
            console.log(error)
        }
    }

    
}