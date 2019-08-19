import React from 'react';
import DanceMove from './danceMove';
import { connect } from 'react-redux';
import { addDanceMove, editDanceMove, deleteDanceMove } from '../actions/danceListActions';
import { Form, Button, Table, Row, Col } from 'react-bootstrap';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { getElementIfNotOnList } from '../helpers/validation';

class DanceMovePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            difficulty: '',
            danceList: this.props.danceList
        }
    }

    componentWillReceiveProps = props => {
        this.setState({ danceList: props.danceList });
    }

    handleDanceMove = (type, event) => {
        this.setState({ [type]: event.target.value });
    }

    handleAddDanceMove = event => {
        event.preventDefault();
        this.addDanceMove();
        this.clearState();
    }

    addDanceMove = () => {
        const newDanceMove = getElementIfNotOnList(this.props.danceList, this.createDanceMove());
        if (newDanceMove) {
            this.props.addDanceMove(newDanceMove);
        }
    }

    createDanceMove = () => {
        return Object.assign({}, { name: this.state.name, difficulty: this.state.difficulty });
    }

    clearState = () => {
        this.setState({ name: '', difficulty: '' });
    }

    sortDanceMoves = event => {
        const sortedDanceList = this.sortDanceMovesBySelectedValue(event.target.value);
        this.setState({ danceList: sortedDanceList });
    }

    sortDanceMovesBySelectedValue = selectedValue => {
        const danceListCopy = Array.from(this.state.danceList);
        return danceListCopy.sort((a, b) => a[selectedValue] > b[selectedValue] ? 1 : -1);
    }

    render() {
        return (
            <>
                <h2 className="heading heading--secondary">Dance List</h2>
                <Form onSubmit={this.handleAddDanceMove}>
                    <Form.Group as={Row}>
                        <Col sm={{ span: 3, offset: 4 }}>
                            <Form.Control type="text" placeholder="Add a dance move" value={this.state.name} onChange={event => this.handleDanceMove('name', event)} required />
                        </Col>
                        <Col sm={{ span: 2, offset: 0 }}>
                            <Form.Control className="dance-list-select" as='select' value={this.state.difficulty} onChange={event => this.handleDanceMove('difficulty', event)} required>
                                <option value="">Pick difficulty</option>
                                <option value="beginner">beginner</option>
                                <option value="intermediate">intermediate</option>
                                <option value="advanced">advanced</option>
                            </Form.Control>
                        </Col>
                        <Button className="dance-list-button" variant='success' type='submit'>Confirm</Button>
                    </Form.Group>
                </Form>
                {
                    this.props.danceList && this.props.danceList.length ?
                        <>
                            <Form.Group as={Row}>
                                <Form.Label column sm={{ span: 1, offset: 7 }}>Sort by</Form.Label>
                                <Col sm={{ span: 2 }}>
                                    <Form.Control as="select" onChange={this.sortDanceMoves}>
                                        <option value="difficulty">difficulty</option>
                                        <option value="danceMove">name</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Table striped hover responsive>
                                <thead>
                                    <tr>
                                        <th>DanceMove</th>
                                        <th>Difficulty</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.danceList.length ?
                                            this.state.danceList.map(el => {
                                                return <DanceMove key={el.id} danceMove={el} deleteDanceMove={this.props.deleteDanceMove} editDanceMove={this.props.editDanceMove} />
                                            })
                                            : null
                                    }
                                </tbody>
                            </Table>
                        </>
                        : null
                }
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        danceList: state.danceList
    };
}

let mapDispatchToProps = dispatch => ({
    addDanceMove: danceMove => dispatch(addDanceMove(danceMove)),
    editDanceMove: (id, updatedDanceMove) => dispatch(editDanceMove(id, updatedDanceMove)),
    deleteDanceMove: id => dispatch(deleteDanceMove(id))
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{ collection: 'danceList' }])
)(DanceMovePage);