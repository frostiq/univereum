class TransferForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        var address = this.refs.addressField.state;
        var amount = this.refs.amountField.state;
        if (address.valid && amount.valid) {
            Unitoken.transfer(address.value, amount.value)
            .then(() => alert(`${amount.value} tokens transferred successfully`))
            .catch((e) => console.log(e))
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <AddressField ref="addressField" />
                <AmountField ref="amountField" />
                <input type="submit" value="Send tokens" />
            </form>
        );
    }
}