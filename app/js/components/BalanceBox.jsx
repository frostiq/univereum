class BalanceBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = { balance: "?", symbol: "?" }
    }

    componentDidMount() {
        Promise.all([
            Unitoken.balanceOf(web3.eth.defaultAccount),
            Unitoken.decimals(),
            Unitoken.symbol()
        ]).then(a => {
            this.setState({
                balance: a[0].div(10 ** a[1]).toFormat(a[1]),
                symbol: a[2]
            })
        })
    }

    render() {
        return <h4>Yor balance: {this.state.balance} {this.state.symbol}</h4>
    }
}