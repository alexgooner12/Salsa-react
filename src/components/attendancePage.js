import React from 'react';
import { Link } from 'react-router-dom';
import Attendance from './attendance';
import { Form, Table, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { toggleAttendant } from '../actions/attendanceListActions';
import { months } from '../constants/months';

class AttendancePage extends React.Component {
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

    handleToggleAttendant = (selectedAttendantId, selectedAttendanceId) => {
        const selectedAttendance = this.getSelectedAttendance(selectedAttendanceId);
        const selectedAttendant = this.getSelectedAttendant(selectedAttendance, selectedAttendantId);
        selectedAttendant.hasAttended = !selectedAttendant.hasAttended;
        this.props.toggleAttendant(selectedAttendance, selectedAttendant);
    }

    getSelectedAttendance = selectedAttendanceId => {
        return this.props.attendanceList.find(attendance => attendance.id === selectedAttendanceId);
    }

    getSelectedAttendant = (selectedAttendance, selectedAttendantId) => {
        return selectedAttendance.possibleAttendants.find(attendant => attendant.id === selectedAttendantId); // && attendant.date === date
    }

    render() {
        return (
            this.props.attendanceList.length ?
            <>
                <h2 className="heading heading--secondary">Attendance Page</h2>
                <Form.Group as={Row}>
                    <Form.Label column sm={{ span: 2, offset: 6 }}>See attendance for</Form.Label>
                    <Col sm={{ span: 2 }}>
                        <Form.Control as="select" value={this.state.currentMonth} onChange={this.getSelectedMonth}>
                            <option value="" disabled>Pick a month</option>
                            {
                                months.map((month, index) => <option key={index} value={month}>{month}</option>)
                            }
                        </Form.Control>
                    </Col>
                </Form.Group>
                    <>
                        <Table responsive striped hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Group</th>
                                    <th>Date</th>
                                    <th>Attended</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.attendanceList.map((attendance, index) => attendance.month === this.state.currentMonth ? <Attendance key={index} attendance={attendance} toggleAttendant={this.handleToggleAttendant}/> : null)
                                }
                            </tbody>
                        </Table>
                    </>
            </>
            : 
            <div className="instructions">
                <Link to="Salsa-react">Create a schedule first</Link>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        groupList: state.groupList,
        memberList: state.memberList,
        attendanceList: state.attendanceList
    };
}

let mapDispatchToProps = dispatch => ({
    toggleAttendant: (attendance, attendant) => dispatch(toggleAttendant(attendance, attendant))
});


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{ collection: 'attendanceList' }])
)(AttendancePage);