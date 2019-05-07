import React, { Component } from "react";


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
            <div className="AddButton">
                    <button type="button"
                            className="btn btn-success"
                            onClick={() => {
                                this.props.history.push("/watchlist/new")}
                            }
                            >
                        Add Record
                    </button>
                </div>
                <section className="content Vinyl">
                {
                this.props.myCollection.filter(record => record.watchList === true)
                .map(record =>

                    <div key={record.id}>

                        <div>
                        {record.artistName}
                        {record.albumTitle}
                        {record.year}
                        {record.condition}
                        {record.date}
                        <button
                                    onClick={() => this.props.deleteRecord(record.id)}
                                    className="card-delete">Delete</button>
                                    <button
                                    onClick={() => this.props.history.push(`/watchlist/${record.id}/edit`)}
                                    className="card-edit">Edit</button>
                                    <button
                                    type="submit"
                                    onClick={this.handleAddToCollection}
                                    className="card-edit" id={record.id}>Add to Collection</button>
                        </div>
                    </div>

                )
            }
            </section>
           </article>
        )
    }
}