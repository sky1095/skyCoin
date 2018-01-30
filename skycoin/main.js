/* 
    This is a demo project to represent how a BlockChain Technology Work, and its made for non-profit,
    educational purpose. If you try to implement this code for your blockchain it won't work as a real
    blockchain technology needs a peer-to-peer network and many other constrains to work upon.
    Enjoy skyCoin !!!! 

    links used:
     https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide
     https://www.blockchain.com/
     https://bravenewcoin.com/assets/Reference-Papers/A-Gentle-Introduction/A-Gentle-Introduction-To-Blockchain-Technology-WEB.pdf
    & a tons of Google Search

    Limitations: 
        Lack of Peer-to-peer network - Most Important
        proof of work is not added yet!

*/

// I have npm install the crypto-js file because javascript doesn't come with hash functions.

const SHA256 = require('crypto-js/sha256');     //Import of SHA265 hash function

//node for a single block
class Block{
    constructor(index, timestamp, data, previousHash){  //intitalizing the values using a constructor class
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

//method to calculate Hash value, Hash value used is SHA256
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()]; //Genesis Block
    }

    createGenesisBlock(){
        return new Block(0, "30.01.2018", "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1]; // This returns the last block added i.e. the latest block
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash; //setting the previousHash value to the last block's hash
        newBlock.hash = newBlock.calculateHash();  //Creating new hash value of the block
        this.chain.push(newBlock);        //Pushing the block in blockChain
        //Adding a block isn't this simple in a real life block-chain, as it requires tons of checks from other who is contributing in the blockChain.
    }

//BlockChain Logic: Checking the validity of the block
    isChainValid(){
        for(let i=1; i < this.chain.length; i++){  //i starting from 1 and not 0 because 0 is genesis block
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];
            
            if(currentBlock.hash != currentBlock.calculateHash()){
                return 'invalid block' ;
            }

            if(currentBlock.previousHash != previousBlock.hash){
                return 'invalid block';
            }
        }

        return 'Valid Block';
    }
    
}

//This will create objects of the Blockchain class

let skyCoin = new Blockchain();
    //Values hard-typed in blockChain
    skyCoin.addBlock(new Block(1, "30.01.2018",{amount: 100})); 
    skyCoin.addBlock(new Block(2, "02.02.2018",{amount: 10}));

//Examples to test the blockchain

    //console.log(JSON.stringify(skyCoin,null,4)); // prints the object in JSON format in the screen
    //skyCoin.chain[2].data = {amout: 1000}; // Tampering the data of added block
    //console.log('Block state? ' + skyCoin.isChainValid()); // Outputs the state of block

