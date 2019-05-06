import React, { Component } from "react";


export default class HolyGraylList extends Component {
    state = {
        holyGrayl: true
    }

    handleAddToCollection = evt => {
        evt.preventDefault()
        let recordId = evt.target.id
        const patchedRecord = {
        id: parseInt(recordId),
        holyGrayl: false
        }
        console.log(patchedRecord)
        this.props.addToCollection(patchedRecord)
        .then(() => this.props.history.push("/holyGrayl"))
     }

    // handleAddCollection(){
    //     this.setState({
    //         holyGrayl: false
    //     })
        // this.props.history.push(`/myCollection`)

    render () {
        return (
            <article className="header">
            <h1>Holy Grayl</h1>
            <div className="AddButton">
                    <button type="button"
                            className="btn btn-success"
                            onClick={() => {
                                this.props.history.push("/holyGrayl/new")}
                            }
                            >
                        Add Record
                    </button>
                </div>
                <section className="content Vinyl">
                {
                this.props.myCollection.filter(record => record.holyGrayl === true)
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
                                    onClick={() => this.props.history.push(`/holyGrayl/${record.id}/edit`)}
                                    className="card-edit">Edit</button>
                                    <button
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