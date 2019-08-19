import React from 'react';
import { Form, Table, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { togglePayment } from '../actions/paymentListActions';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { months } from '../constants/months';

class PaymentPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMonth: ''
        }
    }

    componentDidMount = () => {
        this.setCurrentMonth();
    }

    setCurrentMonth = () => {
        const currentMonthIndex = new Date().getMonth();
        this.setState({ currentMonth: months[currentMonthIndex] });
    }

    getSelectedMonth = event => {
        this.setState({ currentMonth: event.target.value });
    }

    handleTogglePayment = event => {
        const selectedPayer = this.getSelectedPayer(event);
        const selectedPayment = this.getSelectedPayment(selectedPayer);
        selectedPayment.hasPaid = !selectedPayment.hasPaid;
        this.props.togglePayment(selectedPayer);
    }

    getSelectedPayer = event => {
        return this.props.paymentList.find(payer => payer.id === event.target.id);
    }

    getSelectedPayment = selectedPayer => {
        return selectedPayer.payments.find(payment => payment.month === this.state.currentMonth);
    }

    render() {
        return (
            this.props.paymentList.length ?
                <>
                    <h2 className="heading heading--secondary">Payment Page</h2>
                    <Form.Group as={Row}>
                        <Col sm={{ span: 2, offset: 6 }}>
                            <Form.Label>See payments for</Form.Label>
                        </Col>
                        <Col sm={{ span: 2 }}>
                            <Form.Control as='select' value={this.state.currentMonth} onChange={this.getSelectedMonth} required>
                                <option value="">Pick a month</option>
                                {
                                    months.map((month, index) =>
                                        <option key={index} value={month}>{month}</option>
                                    )
                                }
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Table striped hover responsive>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Paid</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.paymentList.length ?
                                    this.props.paymentList.map(payer => {
                                        if (!payer.isDisabled) {
                                            return (
                                                <tr key={payer.id}>
                                                    <td>{payer.name}</td>
                                                    {
                                                        payer.payments.map((payment, index) => {
                                                            if (payment.month === this.state.currentMonth) {
                                                                return (
                                                                    <td key={index}>
                                                                        <Form.Check type='checkbox' id={payer.id} checked={payment.hasPaid} onChange={event => this.handleTogglePayment(event)} />
                                                                    </td>
                                                                )
                                                            }
                                                        })
                                                    }
                                                </tr>
                                            )
                                        }
                                    })
                                    :
                                    <div className="instructions">
                                        <p>Create a Member first</p>
                                        <Link to="/registration-page">Click to create a member</Link>
                                    </div>
                            }
                        </tbody>
                    </Table>
                </>
                :
                <div className="instructions">
                    <Link to="/registration-page">Create a member first</Link>
                </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        groupList: state.groupList,
        memberList: state.memberList,
        paymentList: state.paymentList
    };
}

let mapDispatchToProps = dispatch => ({
    togglePayment: payer => dispatch(togglePayment(payer))
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{ collection: 'paymentList' }])
)(PaymentPage);