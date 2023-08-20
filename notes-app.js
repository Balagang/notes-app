const notes = []

const filters = {
    searchText: ''
}

const notesJSON = localStorage.getItem('notes')

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
        newNote.textContent = note.title
        document.querySelector('#notes').appendChild(newNote)
    })
}

renderNotes(notes, filters)

document.querySelector('#create-note').addEventListener('click', (e) => {
    console.log('Click button')
    console.log(e)
    e.target.textContent = 'The button was clicked'
})

document.querySelector('input#search-text').addEventListener('input', function (e) {
    // console.log(e.target.value)
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})

document.querySelector('#filter-by').addEventListener('change', (e) => {
    console.log(e.target.value)
})