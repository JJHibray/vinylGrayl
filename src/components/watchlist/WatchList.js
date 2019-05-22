import React, { Component } from "react";
import "../mycollection/Collection.css"
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Container, Button, Row, Col } from 'reactstrap';



export default class WatchList extends Component {
    state = {
        watchList: true
    }

    handleAddToCollection = evt => {
        evt.preventDefault()
        let recordId = evt.target.id
        const patchedRecord = {
        id: parseInt(recordId),
        watchList: false,
        }
        console.log("test", patchedRecord)
        this.props.addToCollection(patchedRecord)
        .then(() => this.props.history.push("/watchList"))
     }

    render () {
        return (
            <article className="header">
            <h1>Watchlist</h1>
            <div className="addButton">
                    <Button color="secondary" type="button"
                            onClick={() => {
                                this.props.history.push("/watchlist/new")}
                            }
                            >
                        Add Record
                    </Button>
                </div>
                <section className="content Vinyl">
                <Container>
                <Row>
                {
                    this.props.myCollection.filter(record => record.watchList === true && record.holyGrayl === false)
                 .map(record =>
                    <div  key={record.id}>
                     <Col sm="auto">
                     <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }} className="record-card text-center">
                        <CardImg src={record.imageURL} alt="record Thumbnail"/>
                        <CardBody>
                        <CardTitle>{record.artistName}</CardTitle>
                        <CardSubtitle>{record.albumTitle}</CardSubtitle>
                        <CardText>{record.year}</CardText>
                        <CardText> Condition: {record.condition}</CardText>
                        {/* <CardText>{record.date}</CardText> */}
                        <Button
                        onClick={() => this.props.history.push(`/watchlist/${record.id}/edit`)}
                        className="card-edit">Edit</Button>
                        <Button
                        onClick={() => this.props.deleteRecord(record.id)}
                        className="card-delete">Delete</Button><br/>
                        <Button
                        type="submit"
                        onClick={this.handleAddToCollection}
                        className="card-edit" id={record.id}>Add to Collection</Button>
                        </CardBody>
                     </Card>
                     </Col>
                    </div>
                )
            }
            </Row>
            </Container>
            </section>
           </article>
        )
    }
}