import React, { Component } from "react";
import "../mycollection/Collection.css"
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Container, Button, Row, Col } from 'reactstrap';

    // className="img-fluid recordImage"
export default class CollectionList extends Component {

    render () {
        return (
            <article className="header">
            <h1>My Collection</h1>
            <div className="addButton">
                    <Button color="secondary" type="button"
                            onClick={() => {
                                this.props.history.push("/myCollection/new")}
                            }
                            >
                        Add Record
                    </Button>
                </div>
                <section className="content Vinyl">
                <Container>
                <Row>
                {
                    this.props.myCollection.filter(record => record.watchList === false && record.holyGrayl === false)
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
                        onClick={() => this.props.history.push(`/myCollection/${record.id}/edit`)}
                        className="card-edit">Edit</Button>
                        <Button
                                    onClick={() => this.props.deleteRecord(record.id)}
                                    className="card-delete">Delete</Button>
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