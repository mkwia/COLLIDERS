import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { hasEthereum } from '../utils/ethereum'
import Minter from '../contracts/COLLIDERS_abi.json'

const ADDY = '0x9f1de126ec55ef16d256f30552911c4ee6dd20a5'

export default function YourNFTs() {
    // UI state
    const [nfts, setNfts] = useState([])

    useEffect( function() {
        getNftsOfCurrentWallet()
    });

    // Get NFTs owned by current wallet
    async function getNftsOfCurrentWallet() {
        if(! hasEthereum()) return

        try {
            // Fetch data from contract
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const contract = new ethers.Contract(ADDY, Minter, provider)
            const address = await signer.getAddress()
            // Get amount of tokens owned by this address
            const tokensOwned = await contract.balanceOf(address)
            
            // For each token owned, get the tokenId
            const tokenIds = []

            for(let i = 0; i < tokensOwned; i++) {
                const tokenId = await contract.tokenOfOwnerByIndex(address, i)
                tokenIds.push(tokenId.toString())
            }

            setNfts(tokenIds)
        } catch(error) {
            console.log(error)
        }
    }

    if(nfts.length < 1) return null;



    return (
        <>
            <h2 className="text-2xl font-semibold mb-2">Your NFTs</h2>
            <div className='yourNFTs'>
                <ul className="grid grid-cols-4 gap-6">
                    { nfts.map( (nft) => <div key={nft} className="bg-gray-100 p-4 h-24 lg:h-28 flex justify-center items-center text-lg"><a rel="noreferrer" target="_blank" href={"https://ipfs.io/ipfs/bafybeienetjbvppmdxu4vtrex2356e6bvvks727dukabn4b4v536sjup2y/" + nft + ".png"}>{nft}</a>
                    </div>)}
                </ul>
            </div>
        </>
    )
}