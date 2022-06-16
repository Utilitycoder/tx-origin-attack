const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");

describe("Test Attack", async () => {
  it("Should change the owner of good contract", async () => {
    // Get one Address
    const [_, addr1] = await ethers.getSigners()

    // Deploy Good contract
    const Good = await ethers.getContractFactory("Good")
    const good = await Good.connect(addr1).deploy()
    await good.deployed()
    console.log(`Good contract address: ${good.address}`)

    // Deploy attack contract
    const Attack = await ethers.getContractFactory("Attack")
    const attack = await Attack.connect(addr1).deploy(good.address)
    await attack.deployed()
    console.log(`Attack contract address is: ${attack.address}`)

    // Let's attack and change ownership
    let tx = await attack.connect(addr1).attack()
    await tx.wait()

    //Confirm the new onwer of good contract is Attack contract
    const goodOwner = await good.owner()

    expect(goodOwner).equal(attack.address)



  })
})
