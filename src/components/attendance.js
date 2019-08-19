import React from 'react';

class Attendance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            attendance: this.props.attendance,
            updatedAttendance: this.props.attendance
        };
    }

    componentWillReceiveProps(props) {
        this.setState({ attendance: props.attendance, updatedAttendance: props.attendance });
    }

    toggleAttendant = (selectedAttendantId, selectedAttendanceId) => {
        this.props.toggleAttendant(selectedAttendantId, selectedAttendanceId);
    }

    render() {
        return (
                this.state.attendance.possibleAttendants.map(possibleAttendant =>
                    <tr id={possibleAttendant.id} key={possibleAttendant.id}>
                        <td>
                            {possibleAttendant.name}
                        </td>
                        <td>
                            {this.state.attendance.group}
                        </td>
                        <td>
                            {this.state.attendance.date}
                        </td>
                        <td>
                            <input type="checkbox" checked={possibleAttendant.hasAttended} onChange={() => this.toggleAttendant(possibleAttendant.id, this.state.attendance.id)} />
                        </td>
                    </tr>
                )
             )
        }
}

export default Attendance;