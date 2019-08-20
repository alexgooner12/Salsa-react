import React from 'react';
import Group from './group';
import { Form, Button, Table, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addGroup, editGroup, deleteGroup } from '../actions/groupListActions';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { getElementIfNotOnList } from '../helpers/validation';

class GroupListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
    }

    getGroupValue = event => {
        this.setState({ name: event.target.value });
    }

    handleAddGroup = event => {
        event.preventDefault();
        this.addGroup();
        this.clearState();
    }

    addGroup = () => {
        const newGroup = getElementIfNotOnList(this.props.groupList, this.createGroup());
        if (newGroup) {
            this.props.addGroup(newGroup);
        }
    }

    createGroup = () => {
        return Object.assign({}, { name: this.state.name });
    }

    clearState = () => {
        this.setState({ name: '' });
    }

    render() {
        return (
            <>
                <h2 className="heading heading--secondary">Group List</h2>
                <Form onSubmit={this.handleAddGroup}>
                    <Form.Group as={Row}>
                        <Col sm={{ span: 4, offset: 3 }} md={{ span: 4, offset: 4 }}>
                            <Form.Control type="text" placeholder="Add a group" value={this.state.name} onChange={this.getGroupValue} />
                        </Col>
                        <Button className='button--custom' variant='success' type='submit'>Confirm</Button>
                    </Form.Group>
                </Form>
                {
                    this.props.groupList.length ?
                        <Table striped hover responsive>
                            <thead>
                                <tr>
                                    <th>Name of the group</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.groupList.map(group =>
                                        <Group key={group.id} group={group} editGroup={this.props.editGroup} deleteGroup={this.props.deleteGroup} />
                                    )
                                }
                            </tbody>
                        </Table>
                        : null
                }
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        groupList: state.groupList
    };
}

let mapDispatchToProps = dispatch => ({
    addGroup: group => dispatch(addGroup(group)),
    editGroup: (id, updatedGroup) => dispatch(editGroup(id, updatedGroup)),
    deleteGroup: id => dispatch(deleteGroup(id))
});

export default compose(connect(
    mapStateToProps, mapDispatchToProps),
    firestoreConnect([{ collection: 'groupList' }])
)(GroupListPage);

