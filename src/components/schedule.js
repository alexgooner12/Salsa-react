import React from 'react';
import { Form, Button, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import '../App.css';

class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editingMode: false,
            schedule: this.props.schedule,
            updatedSchedule: this.props.schedule,
            selectedDanceMove: ''
        };
    }

    componentWillReceiveProps(props) {
        this.setState({ schedule: props.schedule, updatedSchedule: props.schedule });
    }

    getEditingValues = (type, event) => {
        type === 'danceMoves' ? this.addDanceMove(event) : this.setState({ updatedSchedule: { ...this.state.updatedSchedule, [type]: event.target.value } });
    }

    addDanceMove = event => {
        const newDanceMove = this.validateDanceMove(event);
        if(newDanceMove) {
            this.setState({ updatedSchedule: { ...this.state.updatedSchedule, danceMoves: [...this.state.updatedSchedule.danceMoves, newDanceMove] } });
        }
    }

    validateDanceMove = event => {
        if(!this.state.updatedSchedule.danceMoves.includes(event.target.value)) {
            return event.target.value;
        } else {
            alert(`${event.target.value} already exists`);
        }
    }

    handleCancel = () => {
        this.setState({ editingMode: false, updatedSchedule: this.state.schedule });
    }

    handleSave = event => {
        event.preventDefault();
        this.setState({ editingMode: false });
        this.props.editSchedule(this.state.updatedSchedule.id, this.state.updatedSchedule);
    }

    deleteSelectedDanceMove = indexOfSelectedDanceMove => {
        const updatedDanceMoves = this.state.updatedSchedule.danceMoves.filter((danceMove, index) => index !== indexOfSelectedDanceMove);
        this.setState({ updatedSchedule: Object.assign({}, { group: this.state.updatedSchedule.group, id: this.state.updatedSchedule.id, date: this.state.updatedSchedule.date, danceMoves: updatedDanceMoves }) });
    }

    handleEdit = event => {
        event.preventDefault();
        this.setState({ editingMode: true });
    }

    handleDelete = () => {
        this.props.deleteSchedule(this.state.schedule.id);
    }

    render() {
        return (
            <ListGroupItem style={{background: "#89D0FF", border: 0}} className="list-item">
                {
                    this.state.editingMode ?
                        <Form>
                            <Form.Group as={Row}>
                                <Form.Label column sm={{ span: 2, offset: 4 }} htmlFor={this.state.updatedSchedule.group}>Group</Form.Label>
                                <Col sm={{ span: 4 }}>
                                    <Form.Control as="select" value={this.state.updatedSchedule.group} onChange={event => this.getEditingValues('group', event)}>
                                        {
                                            this.props.groupList.map(group =>
                                                <option key={group.id} value={group.name}>{group.name}</option>
                                            )
                                        }
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm={{ span: 2, offset: 4 }} htmlFor={this.state.updatedSchedule.date}>Date</Form.Label>
                                <Col sm={{ span: 4 }}>
                                    <Form.Control type="date" value={this.state.updatedSchedule.date} onChange={event => this.getEditingValues('date', event)} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm={{ span: 2, offset: 4 }} htmlFor={this.state.updatedSchedule.danceMoves}>Dance moves</Form.Label>
                                <Col sm={{ span: 4 }}>
                                    <Form.Control as="select" value={this.state.selectedDanceMove} onChange={event => this.getEditingValues('danceMoves', event)}>
                                        {
                                            this.props.danceList.map(danceMove =>
                                                <option key={danceMove.id} value={danceMove.name}>{danceMove.name}</option>
                                            )
                                        }
                                        <option disabled value=''>Pick a dance move</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <ListGroup>
                                {
                                    this.state.updatedSchedule.danceMoves.map((danceMove, index) =>
                                        <ListGroupItem key={index}>{danceMove}
                                            <Button variant="danger" onClick={index => this.deleteSelectedDanceMove(index)}>X</Button>
                                        </ListGroupItem>)
                                }
                            </ListGroup>
                            <Button variant='success' onClick={this.handleSave}>Save</Button>
                            <Button variant='warning' onClick={this.handleCancel}>Cancel</Button>
                        </Form>
                        :
                        <>
                            <p>Schedule for {this.state.schedule.group} group </p>
                            <p>Class is scheduled on {this.state.schedule.date}</p>
                            <p>Dance moves to be practiced:</p>
                            <ListGroup>
                                {
                                   this.state.schedule.danceMoves.map((danceMove, index) =>
                                        <Col key={index} sm={{ span: 2, offset: 5}}>
                                            <ListGroupItem>{danceMove}</ListGroupItem>                                        
                                        </Col>
                                   )
                                }
                            </ListGroup>
                            <Button variant='warning' onClick={this.handleEdit}>Edit</Button>
                            <Button variant='danger' id={this.state.schedule.id} onClick={this.handleDelete}>Delete</Button>
                        </>
                }
            </ListGroupItem>
        )
    }
}

export default Schedule;