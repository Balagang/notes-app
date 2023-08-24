let notes = getSavedNotes()

const filters = {
    searchText: ''
}

renderNotes(notes, filters)

document.querySelector('#create-note').addEventListener('click', (e) => {
    const id = crypto.randomUUID()
    notes.push({
        id: id,
        title: '',
        body: ''
    })
    saveNotes(notes)
    // renderNotes(notes, filters)
    location.assign(`/notes-app/edit.html#${id}`)
})

document.querySelector('input#search-text').addEventListener('input', function (e) {
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})

document.querySelector('#filter-by').addEventListener('change', (e) => {
    console.log(e.target.value)
})
window.addEventListener('storage', (e) => {
    // debugger
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)
        // let notes = getSavedNotes()
        renderNotes(notes, filters)
    }
})