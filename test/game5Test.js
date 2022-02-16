const { assert } = require("chai");
const { ethers } = require("hardhat");
//const { ethers } = require("ethers");

describe("Game5", function() {
  it("should be a winner", async function() {
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();
    await game.deployed();

    // good luck
    let randomWallet = ethers.Wallet.createRandom();

    while(randomWallet.address >= "0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf") {
      randomWallet = ethers.Wallet.createRandom();
    };

    const signer = new ethers.Wallet(randomWallet.privateKey, ethers.provider);
    const signer0 = ethers.provider.getSigner(0);
    await signer0.sendTransaction({
      to: randomWallet.address,
      value: ethers.utils.parseEther('1'),
    });
    await game.connect(signer).win();

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
