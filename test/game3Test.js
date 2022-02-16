const { assert } = require("chai");

describe("Game3", function() {
  it("should be a winner", async function() {
    const Game = await ethers.getContractFactory("Game3");
    const game = await Game.deploy();
    await game.deployed();

    // three addresses, three balances
    // you'll need to update the mapping to win this stage

    // hardhat will create 10 accounts for you by default
    // you can get one of this accounts with ethers.provider.getSigner
    // and passing in the zero-based indexed of the signer you want:
    const signer0 = ethers.provider.getSigner(0);
    const address0 = await signer0.getAddress();
    // to call a contract as a signer you can use contract.connect
    await game.connect(signer0).buy({ value: "2" });

    const signer1 = ethers.provider.getSigner(1);
    const address1 = await signer1.getAddress();
    await game.connect(signer1).buy({ value: "3" });

    const signer2 = ethers.provider.getSigner(2);
    const address2 = await signer2.getAddress();
    await game.connect(signer2).buy({ value: "1" });

    await game.win(address0, address1, address2);

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
