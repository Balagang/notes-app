let notes = []

const filters = {
    searchText: ''
}

const notesJSON = localStorage.getItem('notes')
console.log(notesJSON !== null)

if (notesJSON !== null) {
    notes = JSON.parse(notesJSON)
}

const renderNotes = function (notes, filters) {
    const filterNotes = notes.filter((note) => {
        return note.title.toLowerCase().includes(filters.searchText)
    })
    console.log(filterNotes)
    document.querySelector('#notes').innerHTML = ''

    filterNotes.forEach((note) => {
        const newNote = document.createElement('p')
        if (note.title.length > 0) {
            newNote.textContent = note.title
        } else {
            newNote.textContent = 'Unnamed note'
        }
        document.querySelector('#notes').appendChild(newNote)
    })
}

renderNotes(notes, filters)

document.querySelector('#create-note').addEventListener('click', (e) => {
    e.target.textContent = 'The button was clicked'
    notes.push({
        title: '',
        body: ''
    })
    localStorage.setItem('notes', JSON.stringify(notes))
    renderNotes(notes, filters)
})

document.querySelector('input#search-text').addEventListener('input', function (e) {
    // console.log(e.target.value)
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})

document.querySelector('#filter-by').addEventListener('change', (e) => {
    console.log(e.target.value)
})