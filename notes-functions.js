const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes')
    // console.log(notesJSON !== null)
    if (notesJSON !== null) {
        return JSON.parse(notesJSON)
    } else {
        return []
    }
}

const generateNoteDOM = (note) => {
    const noteEl = document.createElement('p')

    if (note.title.length > 0) {
        noteEl.textContent = note.title
    } else {
        noteEl.textContent = 'Unnamed note'
    }
    return noteEl
}

const renderNotes = function (notes, filters) {
    const filterNotes = notes.filter((note) => {
        return note.title.toLowerCase().includes(filters.searchText)
    })
    // console.log(filterNotes)
    document.querySelector('#notes').innerHTML = ''

    filterNotes.forEach((note) => {
        const noteEl = generateNoteDOM(note)
        document.querySelector('#notes').appendChild(noteEl)
    })
}

const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
}