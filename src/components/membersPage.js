import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Table, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { sortMembers } from '../actions/membersActions';

class MembersPage extends React.Component {
    handleSorting = event => {
        this.props.sortMembers(event.target.value);
    }

    renderMemberList = () => {
        return this.props.memberList.sort((a, b) => (a[this.props.sortingCriterium] > b[this.props.sortingCriterium]) ? 1 : -1)
            .filter(member => !member.isDisabled).map(member => (
                <tr key={member.id} id={member.id}>
                    <td>{member.name}</td>
                    <td>{member.group}</td>
                    <td>{member.startDate}</td>
                    <td>{member.foundOutFrom}</td>
                </tr>
            )
        )
    }

    render() {
        return (
            this.props.memberList.length ?
                <>
                    <h2 className="heading heading--secondary">Members Page</h2>
                    <>
                        <Form.Group as={Row} className="justify-content-md-center">
                            <Form.Label column sm={{ span: 1, offset: 6 }} htmlFor="sort-members">Sort by</Form.Label>
                            <Col sm={{ span: 2 }}>
                                <Form.Control as='select' id="sort-members" onChange={this.handleSorting}>
                                    <option value="group">Group</option>
                                    <option value="startDate">Date</option>
                                    <option value="name">Name</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Table striped responsive hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Group</th>
                                    <th>Started on</th>
                                    <th>Found out from</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.renderMemberList()
                                }
                            </tbody>
                        </Table>
                    </>
                </>
                :
                <div className="instructions">
                    <Link to="/add-members-page">Create a member first</Link>
                </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        memberList: state.memberList,
        sortingCriterium: state.sortingCriterium
    };
}

let mapDispatchToProps = dispatch => ({
    sortMembers: sortingCriterium => dispatch(sortMembers(sortingCriterium))
});

export default connect(mapStateToProps, mapDispatchToProps)(MembersPage);
