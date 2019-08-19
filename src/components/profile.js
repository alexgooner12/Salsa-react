import React from 'react';
import { Form, Button, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editingMode: false,
            profile: this.props.profile,
            updatedProfile: this.props.profile
        };
    }

    componentWillReceiveProps(props) {
        this.setState({ profile: props.profile, updatedProfile: props.profile });
    }

    getEditingValues = (type, event) => {
        type === 'danceMoves' ? this.addNewDanceMove(event) : this.setState({ updatedProfile: { ...this.state.updatedProfile, [type]: event.target.value } });
    }

    addNewDanceMove = event => {
        const validatedNewDanceMove = this.validateNewDanceMove(event);
        if (validatedNewDanceMove) {
            this.setState({ updatedProfile: { ...this.state.updatedProfile, danceMoves: [...this.state.updatedProfile.danceMoves, validatedNewDanceMove] } });
        }
    }

    validateNewDanceMove = event => {
        if (!this.state.updatedProfile.danceMoves.includes(event.target.value) && event.target.value) {
            return event.target.value;
        }
    }

    deleteSelectedDanceMove = selectedDanceMove => {
        const updatedProfileDanceMovesAfterDeletion = this.state.updatedProfile.danceMoves.filter(danceMove => danceMove !== selectedDanceMove);
        this.setState({ updatedProfile: { ...this.state.updatedProfile, danceMoves: updatedProfileDanceMovesAfterDeletion } });
    }

    handleCancel = () => {
        this.setState({ editingMode: false, updatedProfile: this.state.profile });
    }

    handleSave = event => {
        event.preventDefault();
        this.setState({ editingMode: false });
        this.props.editMember(this.state.updatedProfile.id, this.state.updatedProfile);
    }

    handleEdit = event => {
        event.preventDefault();
        this.setState({ editingMode: true });
    }

    handleDisable = () => {
        this.props.disableMember(this.state.profile.id);
    }

    render() {
        return (
            <article key={this.state.profile.id} id={this.state.profile.id}>
                {
                    this.state.editingMode ?
                        <Form>
                            <Form.Group as={Row}>
                                <Form.Label column sm={{ span: 2, offset: 3 }}>Name</Form.Label>
                                <Col sm={{ span: 4 }}>
                                    <Form.Control type="text" value={this.state.updatedProfile.name} onChange={event => this.getEditingValues('name', event)} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm={{ span: 2, offset: 3 }}>Gender</Form.Label>
                                <Col sm={{ span: 4 }}>
                                    <Form.Control as="select" value={this.state.updatedProfile.gender} onChange={event => this.getEditingValues('gender', event)}>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm={{ span: 2, offset: 3 }}>Started on</Form.Label>
                                <Col sm={{ span: 4 }}>
                                    <Form.Control type="date" value={this.state.updatedProfile.startDate} onChange={event => this.getEditingValues('startDate', event)} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm={{ span: 2, offset: 3 }}>Found out from</Form.Label>
                                <Col sm={{ span: 4 }}>
                                    <Form.Control type="text" value={this.state.updatedProfile.foundOutFrom} onChange={event => this.getEditingValues('foundOutFrom', event)} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm={{ span: 2, offset: 3 }}>Group</Form.Label>
                                <Col sm={{ span: 4 }}>
                                    <Form.Control as="select" value={this.state.updatedProfile.group} onChange={event => this.getEditingValues('group', event)}>
                                        {
                                            this.props.groupList.map(group =>
                                                <option key={group.id} value={group.name}>{group.name}</option>
                                            )
                                        }
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm={{ span: 2, offset: 3 }}>Dance moves</Form.Label>
                                <Col sm={{ span: 4 }}>
                                    <Form.Control as="select" onChange={event => this.getEditingValues('danceMoves', event)}>
                                        <option value='' selected disabled>Select a dance move</option>
                                        {
                                            this.props.danceList.map(danceMove =>
                                                <option key={danceMove.id} value={danceMove.name}>{danceMove.name}</option>
                                            )
                                        }
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group>
                              <ListGroup>
                                    {this.state.updatedProfile.danceMoves.map((danceMove, index) =>
                                        <ListGroupItem key={index}>{danceMove}
                                            <Button variant="danger" onClick={event => this.deleteSelectedDanceMove(danceMove, event)}>X</Button>
                                        </ListGroupItem>
                                    )}
                                </ListGroup>
                            </Form.Group>
                            <Button variant='success' id={this.state.profile.id} onClick={this.handleSave}>Save</Button>
                            <Button variant='warning' id={this.state.profile.id} onClick={this.handleCancel}>Cancel</Button>
                        </Form>
                        :
                        <>
                            <h3>{this.state.profile.name}</h3>
                            <p>Gender {this.state.profile.gender}</p>
                            <p>Started on {this.state.profile.startDate}</p>
                            <p>Found out from {this.state.profile.foundOutFrom}</p>
                            <p>Member of {this.state.profile.group} group</p>
                            <p>Dance moves</p>
                            <ListGroup>
                                {
                                    this.state.profile.danceMoves.length ?
                                        this.state.profile.danceMoves.map((danceMove, index) =>
                                            <ListGroupItem style={{ background: "#89D0FF", border: 0 }} key={index}>{danceMove}</ListGroupItem>
                                        )
                                        : <ListGroupItem style={{ background: "#89D0FF", border: 0 }}>{this.state.profile.name} doesn't know any dance moves yet</ListGroupItem>
                                }

                            </ListGroup>
                            <Button variant='warning' id={this.state.profile.id} onClick={this.handleEdit}>Edit</Button>
                            <Button variant='danger' id={this.state.profile.id} onClick={this.handleDisable}>Disable</Button>
                        </>
                }
            </article>
        )
    }
}

export default Profile;