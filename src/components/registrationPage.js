import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addMember } from '../actions/membersActions';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { getElementIfNotOnList } from '../helpers/validation';

class RegistrationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            gender: '',
            foundOutFrom: '',
            startDate: '',
            group: '',
            danceMoves: [],
            isDisabled: false
        }
    }

    getMemberValues = (type, event) => {
        this.setState({ [type]: event.target.value });
    }

    handleAddMember = event => {
        event.preventDefault();
        this.addMember();
        this.clearState();
    }

    addMember = () => {
        const newMember = getElementIfNotOnList(this.props.memberList, this.createMember());
        if (newMember) {
            this.props.addMember(newMember);
        }
    }

    createMember = () => {
        return Object.assign({}, this.state);
    }

    clearState = () => {
        this.setState({ name: '', gender: '', foundOutFrom: '', startDate: '', group: '' });
    }

    render() {
        return (
            this.props.groupList.length ? 
            <Container fluid>
                <h2 className="heading heading--secondary">Add a member</h2>
                <Form onSubmit={this.handleAddMember}>
                    <Form.Group as={Row}>
                        <Form.Label htmlFor="input-name" column sm={{ span: 2, offset: 3 }}>Name</Form.Label>
                        <Col sm={{ span: 4 }}>
                            <Form.Control type="text" id="input-name" placeholder="Name" value={this.state.name} onChange={event => this.getMemberValues('name', event)} required />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label htmlFor="input-gender" column sm={{ span: 2, offset: 3 }}>Gender</Form.Label>
                        <Col sm={{ span: 4 }}>
                            <Form.Control as="select" id="input-gender" value={this.state.gender} onChange={event => this.getMemberValues('gender', event)} required>
                                <option value="">Pick a gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label htmlFor="input-found-out-from" column sm={{ span: 2, offset: 3 }}>Found out from</Form.Label>
                        <Col sm={{ span: 4 }}>
                            <Form.Control type="text" id="input-found-out-from" placeholder="Found out from" value={this.state.foundOutFrom} onChange={event => this.getMemberValues('foundOutFrom', event)} required />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label htmlFor="input-date" column sm={{ span: 2, offset: 3 }}>Start Date</Form.Label>
                        <Col sm={{ span: 4 }}>
                            <Form.Control type="date" id="input-date" placeholder="Start date" value={this.state.startDate} onChange={event => this.getMemberValues('startDate', event)} required />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label htmlFor="input-group" column sm={{ span: 2, offset: 3 }}>Group</Form.Label>
                        <Col sm={{ span: 4}}>
                            <Form.Control as="select" id="input-group" value={this.state.group} onChange={event => this.getMemberValues('group', event)} required>
                                <option disabled value="">Pick a group</option>
                                {this.props.groupList.map(group => <option key={group.id}>{group.name}</option>)}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Button variant='success' type='submit'>Confirm</Button>
                </Form>
            </Container>
            : 
            <div className="instructions">
                <Link to="/group-list-page">Click to create a group</Link>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        memberList: state.memberList,
        groupList: state.groupList
    };
}

let mapDispatchToProps = dispatch => ({
    addMember: member => dispatch(addMember(member)),
});

export default compose(connect(
    mapStateToProps, mapDispatchToProps),
    firestoreConnect([ { collection: 'memberList'} ])
)(RegistrationPage);
