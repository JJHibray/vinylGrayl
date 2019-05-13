import React, { Component } from "react";

export default class CollectionList extends Component {
    render () {
        return (
            <article className="header">
            <h1>My Collection</h1>
            <div className="AddButton">
                    <button type="button"
                            className="btn btn-success"
                            onClick={() => {
                                this.props.history.push("/myCollection/new")}
                            }
                            >
                        Add Record
                    </button>
                </div>
                <section className="content Vinyl">
                {
                 this.props.myCollection.filter(record => record.watchList === false && record.holyGrayl === false)
                 .map(record =>
                    <div key={record.id}>
                        <div>
                        <img src={record.imageURL} className="img-fluid recordImage" alt="record Thumbnail"/>
                        <h2>{record.artistName}</h2>
                        <h3>{record.albumTitle}</h3>
                        <p>{record.year}</p>
                        <p>{record.condition}</p>
                        <p>{record.date}</p>
                        <button
                                    onClick={() => this.props.deleteRecord(record.id)}
                                    className="card-delete">Delete</button>
                                    <button
                                    onClick={() => this.props.history.push(`/myCollection/${record.id}/edit`)}
                                    className="card-edit">Edit</button>
                        </div>
                    </div>
                )
            }
            </section>
           </article>
        )
    }
}