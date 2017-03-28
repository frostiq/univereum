class BalanceBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {balance: "?", symbol: "?"}
    }

    componentDidMount() {
        var balance = Unitoken.balanceOf(web3.eth.defaultAccount)
        var symbol = Unitoken.symbol()
        balance.then((b) =>
            symbol.then((s) =>
                this.setState({balance: b.toFixed(2), symbol: s})
            )
        )
    }

    render() {
        return <h4>Yor balance: {this.state.balance} {this.state.symbol}</h4>
    }
}