class ValidatableField extends React.Component {
    constructor(props) {
        super(props)
        var val = props.value || ''
        this.state = { value: val, valid: this.validate(val) }
        this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
        var val = e.target.value
        this.setState({ value: val, valid: this.validate(val) })
    }
    render() {
        var color = this.state.valid === true ? "green" : "red"
        return <p>
            <label>{this.label}</label><br />
            <input type={this.type} value={this.state.value} onChange={this.onChange} style={{ borderColor: color, width: 330 }} />
        </p>
    }
}

class AddressField extends ValidatableField {
    get label() { return "Address" }
    get type() {return "text" }

    validate(val) {
        return web3.isAddress(val)
    }
}

class AmountField extends ValidatableField {
    get label() { return "Amount" }
    get type() { return "number" }

    validate(val) {
        return val > 0
    }
}