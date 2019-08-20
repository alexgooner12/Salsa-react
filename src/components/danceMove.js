import React from 'react';
import { Form, Button } from 'react-bootstrap';

class DanceMove extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editingMode: false,
            danceMove: this.props.danceMove,
            updatedDanceMove: this.props.danceMove
        };
    }

    componentWillReceiveProps(props) {
        this.setState({ danceMove: props.danceMove, updatedDanceMove: props.danceMove });
    }

    getEditingValue = (type, event) => {
        this.setState({ updatedDanceMove: { ...this.state.updatedDanceMove, [type]: event.target.value } });
    }

    handleCancel = () => {
        this.setState({ editingMode: false, updatedDanceMove: this.state.danceMove });
    }

    handleSave = event => {
        event.preventDefault();
        this.setState({ editingMode: false });
        this.props.editDanceMove(this.state.updatedDanceMove.id, this.state.updatedDanceMove);
    }

    handleEdit = event => {
        event.preventDefault();
        this.setState({ editingMode: true });
    }

    handleDelete = () => {
        this.props.deleteDanceMove(this.state.danceMove.id);
    }

    render() {
        return (
            <tr id={this.state.updatedDanceMove.id} key={this.state.updatedDanceMove.id}>
                {
                    this.state.editingMode ?
                        <>
                            <td>
                                <Form.Control type='text' value={this.state.updatedDanceMove.name} onChange={event => this.getEditingValue('name', event)} />
                            </td>
                            <td>
                                <Form.Control as='select' id={this.state.updatedDanceMove.id} value={this.state.updatedDanceMove.difficulty} onChange={event => this.getEditingValue('difficulty', event)}>
                                    <option value="beginner">beginner</option>
                                    <option value="intermidiate">intermidiate</option>
                                    <option value="advanced">advanced</option>
                                </Form.Control>
                            </td>
                            <td>
                                <Button variant='success'id={this.state.updatedDanceMove.id} onClick={this.handleSave}>Save</Button>
                            </td>
                            <td>
                                <Button variant='warning'id={this.state.updatedDanceMove.id} onClick={this.handleCancel}>Cancel</Button>
                            </td>
                        </>
                        :
                        <>
                            <td>{this.state.danceMove.name}</td>
                            <td>{this.state.danceMove.difficulty}</td>
                            <td>
                                <Button variant='warning' id={this.state.danceMove.id} onClick={this.handleEdit}>Edit</Button>
                            </td>
                            <td>
                                <Button variant='danger' id={this.state.danceMove.id} onClick={this.handleDelete}>Delete</Button>
                            </td>
                        </>
                }
            </tr>
        )
    }
}

export default DanceMove;