const remoteURL = "http://localhost:5002"


export default {
  getOneRecord(id) {
    return fetch(`${remoteURL}/myCollection/${id}`).then(e => e.json())
  },
getAllRecords() {

    return fetch(`${remoteURL}/myCollection`)
    .then(r => r.json())
    .then(e => e.filter(record => record.userId === parseInt(sessionStorage.getItem("userId")))
    )},

post(newAlbum) {
    return fetch(`${remoteURL}/myCollection`, {
      method: "POST",
      headers: {
       "Content-Type": "application/json"
    },
    body: JSON.stringify(newAlbum)
  }).then(data => data.json())
},

removeAndListRecords(id) {
  return fetch(`${remoteURL}/myCollection/${id}`, {
        method: "DELETE"
  })
  .then(e => e.json())
  .then(() => this.getAllRecords())
},

putRecord(editedRecord) {
  return fetch(`${remoteURL}/myCollection/${editedRecord.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(editedRecord)
  }).then(data => data.json());
},

patchRecord(editedRecord) {
  return fetch(`${remoteURL}/myCollection/${editedRecord.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body:JSON.stringify(editedRecord)
  }).then(data => data.json());
}

}