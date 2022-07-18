// SPDX-License-Identifier: GPL-3.0

// banker = 0xD724daB93DdcB36b0d17B23BE26e8eD745d13B73
// images = ipfs://bafybeienetjbvppmdxu4vtrex2356e6bvvks727dukabn4b4v536sjup2y/
// baseURI = ipfs://bafybeibabte7jq4hhlmf7loiezfafoyln2ue3puf6k736jywocitfldqai/

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title SampleERC721
 * @dev Create a sample ERC721 standard token
 */

// Main ERC721 Colliders Contract


contract COLLIDERS is ERC721, Ownable, ERC721Enumerable, Pausable {

    // using SafeMath for uint256;
    using Strings for uint256;
    
    mapping(uint256 => uint256) private assignOrders;

    address payable internal walletBanker;

    // set helper vars for supply
    uint256 public constant MAX_SUPPLY = 500;
    uint256 public COLLIDERSsRemainingToAssign = 500;

    bool public mintPaused;
    
    // Base URI
    string private _baseURIextended;


    // used in contract deployment, requires provision on IPFS base resource URI, collection name and token symbol
    constructor(string memory name, string memory symbol, address payable _walletBanker) ERC721(name, symbol) {
        walletBanker = _walletBanker;
    }

    function setBaseURI(string memory baseURI_) external onlyOwner() {
        _baseURIextended = baseURI_;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseURIextended;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual
    override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);

        // do stuff before every transfer
        // e.g. check that vote (other than when minted) 
        // being transferred to registered candidate
    }


    // retrieve price of token, amount requested
    function getNFTPrice(uint256 amount) public view returns (uint256) {
        // sale ended? no price.
        require(totalSupply() < MAX_SUPPLY, "Sale has already ended.");
        // otherwise 5FTM each
        return amount * 5 ether;
    }

    // helper function for assigning random token, instead of distributing tokenId 1, 2, 3, etc.
    function _random() internal view returns(uint256) {
        // keccak pack a bunch of randomly changing variables for pseudorandomness.
        return uint256(
            keccak256(
                abi.encodePacked(block.timestamp + block.difficulty + ((uint256(keccak256(abi.encodePacked(block.coinbase)))) / block.timestamp) + block.gaslimit + ((uint256(keccak256(abi.encodePacked(_msgSender())))) / block.timestamp) + block.number)
            )
        ) / COLLIDERSsRemainingToAssign;
    } 

    // assign random ID during purchase
    function _fillAssignOrder(uint256 orderA, uint256 orderB) internal returns(uint256) {
        uint256 temp = orderA;
        if (assignOrders[orderA] > 0) temp = assignOrders[orderA];
        assignOrders[orderA] = orderB;
        if (assignOrders[orderB] > 0) assignOrders[orderA] = assignOrders[orderB];
        assignOrders[orderB] = temp;
        return assignOrders[orderA];
    }

    // main minting function which will be called from ethers.js
    function mintNFT(uint256 amount) public payable {
        // minting cannot be paused to proceed
        require(mintPaused == false, "Minting Paused");
        // are there still tokens available?
        require(totalSupply() < MAX_SUPPLY, "Sale has already ended.");
        // block transactions for 0 tokens
        require(amount > 0, "You cannot mint 0 NFTs.");
        // don't allow purchases of more than 10 tokens in one tx
        require(amount <= 10, "You cannot mint more than 10 NTFs per transaction");
        // limit each wallet address to 20 tokens
        require((balanceOf(msg.sender) + amount) <= 20, "Leave some for the rest of us! (You cannot own more than 20 COLLIDERS)");
        // near the end of the sale, make sure we don't mint more tokens than availale.
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds maximum supply. Please try to mint less Nfts.");
        // does the number of ordered tokens match the FTM amount sent in the tx?
        require(getNFTPrice(amount) == msg.value, "Amount of FTM sent is not correct. (COLLIDERSs cost 5FTM each)");
        
        //// checks complete, lets mint the tokens
        // iterate over no of requested tokens
        for (uint i = 0; i < amount; i++) {
            // assign random id to each new token
            uint256 randIndex = _random() % COLLIDERSsRemainingToAssign;
            uint256 COLLIDERSIndex = _fillAssignOrder(--COLLIDERSsRemainingToAssign, randIndex);
            // internal minting function
            _safeMint(msg.sender, COLLIDERSIndex);
        }
        
        // transfer sale proceeds to "banker" wallet
        walletBanker.transfer(getNFTPrice(amount));
    }

    // get the IPFS URI for given token ID
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        return string(abi.encodePacked(_baseURI(), tokenId.toString(),'.json'));
    }
}