import React from 'react';
import { Link } from 'react-router-dom';
import Schedule from './schedule';
import { Form, Button, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addSchedule, editSchedule, deleteSchedule } from '../actions/scheduleListActions';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { validateSchedule } from '../helpers/validation';

class SchedulePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            schedule: {
                group: '',
                date: '',
                danceMoves: [],
                selectedDanceMove: '',
            }
        }
    }

    getScheduleValues = (type, event) => {
        type === 'danceMoves' ? this.addDanceMove(event.target.value) : this.setState({ schedule: { ...this.state.schedule, [type]: event.target.value } });
    }

    addDanceMove(danceMove) {
        const newDanceMove = this.validateDanceMove(danceMove);
        if (newDanceMove) {
            this.setState({ schedule: { ...this.state.schedule, danceMoves: [...this.state.schedule.danceMoves, newDanceMove] } });
        }
    }

    validateDanceMove(danceMove) {
        if (this.state.schedule.danceMoves.includes(danceMove)) {
            alert(`${danceMove} has already been added`)
        } else {
            return danceMove;
        }
    }

    handleAddSchedule = event => {
        event.preventDefault();
        this.addSchedule();
        this.clearState();
    }

    addSchedule = () => {
        const validatedSchedule = validateSchedule(this.props.scheduleList, this.createSchedule());
        if (validatedSchedule) {
            this.props.addSchedule(validatedSchedule);
        }
    }

    createSchedule = () => {
        return Object.assign({}, { group: this.state.schedule.group, date: this.state.schedule.date, danceMoves: this.state.schedule.danceMoves });
    }

    clearState = () => {
        this.setState({ schedule: { group: '', date: '', danceMoves: '' } });
    }

    editSchedule = () => {
        this.setState({ editingMode: !this.state.editingMode });
    }

    cancelEditingSchedule = () => {
        this.setState({ editingMode: !this.state.editingMode });
    }

    deleteSelectedDanceMove = event => {
        const updatedDanceMoves = this.state.schedule.danceMoves.filter((danceMove, index) => index !== +event.target.id);
        this.setState({ schedule: { ...this.state.schedule, danceMoves: updatedDanceMoves } });
    }

    render() {
        return (
            this.props.memberList.length && this.props.danceList.length ?
                <>
                    <h2 className="heading heading--secondary">Schedule Page</h2>
                    <Form onSubmit={this.handleAddSchedule}>
                        <Form.Group as={Row}>
                            <Form.Label column sm={{ span: 2, offset: 4 }}>Group</Form.Label>
                            <Col sm={{ span: 4 }}>
                                <Form.Control as="select" value={this.state.schedule.group} onChange={event => this.getScheduleValues('group', event)} multiple={false} required>
                                    <option value="">Pick a group</option>
                                    {
                                        this.props.groupList.map(group =>
                                            <option key={group.id} value={group.name}>{group.name}</option>
                                        )
                                    }
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm={{ span: 2, offset: 4 }}>Date</Form.Label>
                            <Col sm={{ span: 4 }}>
                                <Form.Control type="date" value={this.state.schedule.date} onChange={event => this.getScheduleValues('date', event)} required />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm={{ span: 2, offset: 4 }}>Dance moves</Form.Label>
                            <Col sm={{ span: 4 }}>
                                <Form.Control as='select' value={this.state.schedule.selectedDanceMove} onChange={event => this.getScheduleValues('danceMoves', event)} multiple={false} required>
                                    {
                                        this.props.danceList.map(danceMove =>
                                            <option key={danceMove.id} value={danceMove.name}>{danceMove.name}</option>
                                        )
                                    }
                                    <option value="" disabled>Pick dance moves</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        {
                            this.state.schedule.danceMoves.length ?
                                <div>
                                    <p>List of new dance moves: </p>
                                    <ListGroup>
                                        {this.state.schedule.danceMoves.map((danceMove, index) => {
                                            return (
                                                <ListGroupItem key={index}>
                                                    {danceMove}
                                                    <Button variant="danger" id={index} onClick={this.deleteSelectedDanceMove}>X</Button>
                                                </ListGroupItem>
                                            )
                                        })
                                        }
                                    </ListGroup>
                                </div>
                                : null
                        }

                        <Button variant="success" type="submit">
                            Create schedule
                    </Button>
                    </Form>
                    <ListGroup>
                        {
                            this.props.scheduleList.map(schedule =>
                                <Schedule key={schedule.id} groupList={this.props.groupList} danceList={this.props.danceList} schedule={schedule} editingMode={this.state.editingMode} editSchedule={this.props.editSchedule} deleteSchedule={this.props.deleteSchedule} />
                            )
                        }
                    </ListGroup>
                </>
                :
                    <div className="instructions">
                        <div>
                            <Link to="/dance-move-page">Click to create a dance list</Link>
                        </div>
                        <div>
                            <Link to="/registration-page">Click to create a member</Link>
                        </div>
                    </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        groupList: state.groupList,
        danceList: state.danceList,
        memberList: state.memberList,
        scheduleList: state.scheduleList
    };
}

let mapDispatchToProps = dispatch => ({
    addSchedule: schedule => dispatch(addSchedule(schedule)),
    editSchedule: (id, updatedSchedule) => dispatch(editSchedule(id, updatedSchedule)),
    deleteSchedule: id => dispatch(deleteSchedule(id))
});

export default compose(connect(
    mapStateToProps, mapDispatchToProps),
    firestoreConnect([{ collection: 'scheduleList' }])
)(SchedulePage);