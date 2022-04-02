const { ethers } = require( "ethers" );
const config = require( "./config.js" )

main()

async function main() {

    console.log( 'START' )
    try {
        await getBalance();
    }
    catch( e ) {
        console.error( e )
    }
    console.log( 'END' )

}

async function getBalance() {
    console.log( 'getBalance' )

    console.log( `creating provider: ${ config.provider }` )
    var provider = new ethers.providers.JsonRpcProvider( config.provider )

    console.log( 'getting block number' )
    var blockNumber = await provider.getBlockNumber()
    // 14467379
    console.log( 'blockNumber', blockNumber )

    console.log( 'getting balance' )
    // Get the balance of an account (by address or ENS name, if supported by network)
    var balance = await provider.getBalance( config.icycroAddress )
    // { BigNumber: "82826475815887608" }

    // Often you need to format the output to something more user-friendly,
    // such as in ether (instead of wei)
    var fBalance = ethers.utils.formatEther(balance)
    // '0.082826475815887608'
    console.log( 'fBalance', fBalance )

    // If a user enters a string in an input field, you may need
    // to convert it from ether (as a string) to wei (as a BigNumber)
    ethers.utils.parseEther("1.0")


    const icycro = new ethers.Contract(
        config.icycroAddress, 
        config.icycroABI, 
        provider
    );
    
    const token0Address = await icycro.token0();
    console.log( `Token0: ${ token0Address }`)
    const token1Address = await icycro.token1();
    console.log( `Token1: ${ token1Address }`)

    const token0 = new ethers.Contract(
        token0Address, 
        config.tokenABI, 
        provider
    );
    const token1 = new ethers.Contract(
        token1Address, 
        config.tokenABI, 
        provider
    );

    var decimal0 = await token0.decimals()
    var balance0 = await token0.balanceOf( config.icycroAddress )
    var adjustedBalance0 = balance0 / Math.pow( 10, decimal0 )
    var tokenName0 = await token0.name()
    var tokenSymbol0 = await token0.symbol()

    var decimal1 = await token1.decimals()
    var balance1 = await token1.balanceOf( config.icycroAddress )
    var adjustedBalance1 = balance1 / Math.pow( 10, decimal1 )
    var tokenName1 = await token1.name()
    var tokenSymbol1 = await token1.symbol()

    console.log( `TOKEN0: ${ adjustedBalance0 } ${ tokenSymbol0 } ( ${ tokenName0 } )` )
    console.log( `TOKEN1: ${ adjustedBalance1 } ${ tokenSymbol1 } ( ${ tokenName1 } )` )

    const reserves = await icycro.getReserves();
    const reserve0 = reserves.reserve0
    console.log( `Reserve0: ${ reserve0 }`)
    const reserve1 = reserves.reserve1
    console.log( `Reserve1: ${ reserve1 }`)
    console.log( 'Price', reserve0 / reserve1, reserve1 / reserve0 )
/*
    //console.log( reserves )
    console.log( parseInt( ethers.utils.formatUnits( reserve0, 'ether' ) ) )
    console.log( ethers.utils.formatUnits( reserve1, 'ether' ) )

    console.log( reserve0.div( reserve1 ) )
    console.log( reserve1.div( reserve0 ) )

    const price = await reserve0.div( reserve1 ) 
    
    console.log( price )

    var fPrice = ethers.utils.formatUnits( price, 'gwei' )
    // '0.082826475815887608'
    console.log( 'fPrice', fPrice )
*/
}