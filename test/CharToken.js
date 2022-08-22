const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('CharToken', function() {
    beforeEach(async function() {
        [owner, signer2] = await ethers.getSigners();

        CharToken = await ethers.getContractFactory('CharToken', owner);
        charToken = await CharToken.deploy();
    });

    describe('transfer', function() {
        it('transfers tokens, reduces supply and wallet balances', async function() {
            let ownerBalance;
            let signer2Balance;
            let totalSupply;
    
            totalSupply = await charToken.totalSupply();
            ownerBalance = await charToken.balanceOf(owner.address);
            expect(totalSupply).to.equal(ethers.utils.parseEther('10'));
            expect(ownerBalance).to.equal(ethers.utils.parseEther('10'));
    
            await charToken.connect(owner).transfer(signer2.address, ethers.utils.parseEther('5'));
    
            totalSupply = await charToken.totalSupply();
            ownerBalance = await charToken.balanceOf(owner.address);
            signer2Balance = await charToken.balanceOf(signer2.address);
    
            expect(totalSupply).to.equal(ethers.utils.parseEther(String(10 - (5 * 0.50))));
            expect(ownerBalance).to.equal(ethers.utils.parseEther('5'));
            expect(signer2Balance).to.equal(ethers.utils.parseEther('2.5'));
        });
    });
});

