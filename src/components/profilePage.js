import React from 'react';
import { Link } from 'react-router-dom';
import Profile from './profile';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { editMember, disableMember, restoreMember } from '../actions/membersActions';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class ProfilePage extends React.Component {
    render() {
        return (
            this.props.memberList.length ?
                <>
                    <h2 className="heading heading--secondary">Profile Page</h2>
                    <ListGroup>
                        {
                            this.props.memberList.length ?
                                this.props.memberList.map(member => {
                                    if (member.isDisabled) {
                                        return (
                                            <ListGroupItem key={member.id}>{member.name}
                                                <Button variant='info' onClick={() => this.props.restoreMember(member.id)}>Restore</Button>
                                            </ListGroupItem>
                                        )
                                    } else {
                                        return <Profile key={member.id} profile={member} editMember={this.props.editMember} disableMember={this.props.disableMember} memberList={this.props.memberList} groupList={this.props.groupList} danceList={this.props.danceList} />
                                    }
                                })
                            : null
                        }
                    </ListGroup>
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
        memberList: state.memberList,
        groupList: state.groupList,
        danceList: state.danceList,
    };
}

let mapDispatchToProps = dispatch => ({
    editMember: (id, updatedMember) => dispatch(editMember(id, updatedMember)),
    disableMember: id => dispatch(disableMember(id)),
    restoreMember: id => dispatch(restoreMember(id))
});

export default compose(connect(
    mapStateToProps, mapDispatchToProps),
    firestoreConnect([{ collection: 'memberList' }])
)(ProfilePage);