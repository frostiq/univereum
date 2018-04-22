import React, { Component } from 'react'
import UnitokenContract from '../build/contracts/Unitoken.json'
import getWeb3 from './utils/getWeb3'
import BigNumber from 'bignumber.js'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      balance: new BigNumber(0),
      symbol: 'UNI',
      web3: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const unitoken = contract(UnitokenContract)
    unitoken.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on Unitoken.
    var unitokenInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      unitoken.deployed().then((instance) => {
        unitokenInstance = instance

        // Stores a given value, 5 by default.
        return unitokenInstance.balanceOf(accounts[0])
      }).then((result) => {
        // Update state with the result.
        return this.setState({ balance: result })
      })
    })
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">

              <h2> Welcome to Univereum project </h2>
              <p> For now UI is missing and only smart-contracts are working </p>
              <p> You can test smart contracts with Mist auto-generated UI </p>
              <p> Any contribution to the project are greatly welcome! </p>

              <h3> Univereum token </h3>
              <p>Your balance: {this.state.balance.toFormat(4)} {this.state.symbol}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
