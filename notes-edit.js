const ID = location.hash.substring(1)
console.log(ID)
let notes = getSavedNotes()
const noteTitle = document.querySelector('#note-title')
let noteBody = document.querySelector('#note-body')

let note = notes.find((note) => {
    return note.id === ID
})

if (note === undefined) {
    location.assign('../notes-app/index.html')
}
noteTitle.value = note.title
noteBody.value = note.body

noteTitle.addEventListener('input', (e) => {
    const updateNote = notes.find((note) => {
        if (note.id === ID) {
            note.title = e.target.value
            console.log(e.target.value)
        }
    })
    saveNotes(notes)
})

noteBody.addEventListener('input', (e) => {
    const updateBody = notes.find((note) => {
        if (note.id === ID) {
            note.body = e.target.value
            console.log(e.target.value)
        }
    })
    saveNotes(notes)
})

document.querySelector('#remove-note').addEventListener('click', () => {
    removeNote(note.id)
    saveNotes(notes)
    location.assign('../notes-app/index.html')
})

window.addEventListener('storage', (e) => {
    // debugger
    console.log(e)
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)
        note = notes.find((note) => {
            return note.id === ID
        })

        if (note === undefined) {
            location.assign('../notes-app/index.html')
        }
        noteTitle.value = note.title
        noteBody.value = note.body
    }
})