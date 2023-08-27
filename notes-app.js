'use strict'

let notes = getSavedNotes()

const filters = {
    searchText: '',
    sortBy: 'byEdited'
}

renderNotes(notes, filters)

document.querySelector('#create-note').addEventListener('click', (e) => {
    const id = crypto.randomUUID()
    const timestamp = moment().valueOf()
    notes.push({
        id: id,
        title: '',
        body: '',
        createdAt: timestamp,
        updatedAt: timestamp,
    })
    saveNotes(notes)
    // renderNotes(notes, filters)
    location.assign(`/notes-app/edit.html#${id}`)
})

document.querySelector('input#search-text').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})

document.querySelector('#filter-by').addEventListener('change', (e) => {
    filters.sortBy = e.target.value
    renderNotes(notes, filters)
})
window.addEventListener('storage', (e) => {
    // debugger
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)
        // let notes = getSavedNotes()
        renderNotes(notes, filters)
    }
})


const people = [{
    name: 'Andrew',
    age: 28
},
{
    name: 'Robert',
    age: 32
}, {
    name: ' Chritopher',
    age: 39
}]


const teamA = ['Jonatha', 'Peter', 'Matthew',]

const message = teamA.length <= 3 ? `Team size: ${teamA.length}` : 'Too many people on your team'

console.log(message)
