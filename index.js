const { ethers } = require("ethers");

main()

async function main() {

    try {
    await getBalance();
    }
    catch( e ) {
        console.error( e )
    }

}

async function getBalance() {
    var provider = new ethers.providers.JsonRpcProvider( 'https://evm-t3.cronos.org/:8545' )

    await provider.getBlockNumber()
    // 14467379

    // Get the balance of an account (by address or ENS name, if supported by network)
    balance = await provider.getBalance("ethers.eth")
    // { BigNumber: "82826475815887608" }

    // Often you need to format the output to something more user-friendly,
    // such as in ether (instead of wei)
    ethers.utils.formatEther(balance)
    // '0.082826475815887608'

    // If a user enters a string in an input field, you may need
    // to convert it from ether (as a string) to wei (as a BigNumber)
    ethers.utils.parseEther("1.0")
}