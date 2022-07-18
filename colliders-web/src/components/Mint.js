// import './Mint.css';
// // import TeamMember from './TeamMember';
// // import mint from '../data/team-data';
// import { forwardRef } from 'react';




// const Mint = forwardRef((props, ref) => {

//     currentAccount = this.props.currentAccount;
    
//     mintHandle = () => {
//         this.props.mintNftHandler()
//     }
//     connectHandle = () => {
//         this.props.connectWalletHandler()
//     }

//     const connectWalletButton = () => {
//         return (
//             <button onClick={this.connectHandle} className='cta-button connect-wallet-button'>
//                 Connect Wallet
//             </button>
//         )
//     }
    
//     const mintNftButton = () => {
//         return (
//             <button onClick={this.mintHandle} className='cta-button mint-nft-button'>
//             Mint NFT
//             </button>
//         )
//     }


//     return (
//         <section className='mint' id='Mint' ref={ref}>
//             <div className='mint-container'>
//                 <h2>Mint your FTM BAYC</h2>
//                 <p>
//                     First 1000 FTM BAYC are free! The rest are 10FTM each.
//                 </p>
//                 <p>
//                     You may mint 10 tokens per transaction and 50 tokens per wallet.
//                 </p>
//                 {currentAccount ? mintNftButton() : connectWalletButton()}
//             </div>
//         </section>
//     )
// })

// export default Mint;