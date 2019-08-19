import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

class Group extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editingMode: false,
            group: this.props.group,
            updatedGroup: this.props.group
        };
    }

    componentWillReceiveProps(props) {
        this.setState({ group: props.group, updatedGroup: props.group });
    }

    getEditingValue = (type, event) => {
        this.setState({ updatedGroup: { ...this.state.updatedGroup, [type]: event.target.value } });
    }

    handleCancel = () => {
        this.setState({ editingMode: false, updatedGroup: this.state.group });
    }

    handleSave = event => {
        event.preventDefault();
        this.setState({ editingMode: false });
        this.props.editGroup(this.state.updatedGroup.id, this.state.updatedGroup);
    }

    handleEdit = event => {
        event.preventDefault();
        this.setState({ editingMode: true });
    }

    handleDelete = () => {
        this.props.deleteGroup(this.state.group.id);
    }

    render() {
        return (
            <tr id={this.state.updatedGroup.id} key={this.state.updatedGroup.id}>
                {
                    this.state.editingMode ?
                        <>
                            <td>
                                <Form.Control type="text" value={this.state.updatedGroup.name} onChange={event => this.getEditingValue('name', event)}/>
                            </td>
                            <td>
                                <Button variant='success' id={this.state.updatedGroup.id} onClick={this.handleSave}>Save</Button>
                            </td>
                            <td>
                                <Button variant='warning' id={this.state.updatedGroup.id} onClick={this.handleCancel}>Cancel</Button>
                            </td>
                        </>
                        :
                        <>
                            <td>{this.state.group.name}</td>
                            <td>
                                <Button variant='warning' id={this.state.group.id} onClick={this.handleEdit}>Edit</Button>
                            </td>
                            <td>
                                <Button variant='danger' id={this.state.group.id} onClick={this.handleDelete}>Delete</Button>
                            </td>
                        </>
                }
            </tr>
        )
    }
}

export default Group;