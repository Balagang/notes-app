const ID = location.hash.substring(1)
// console.log(ID)
let notes = getSavedNotes()
const noteTitle = document.querySelector('#note-title')
let noteBody = document.querySelector('#note-body')
const dateElemet = document.querySelector('#last-edited')

let note = notes.find((note) => note.id === ID)

if (note === undefined) {
    location.assign('../notes-app/index.html')
}
noteTitle.value = note.title
noteBody.value = note.body
dateElemet.textContent = generateLastEdited(note.updatedAt)

noteTitle.addEventListener('input', (e) => {
    notes.find((note) => {
        if (note.id === ID) {
            note.title = e.target.value
            note.updatedAt = moment().valueOf()
            dateElemet.textContent = generateLastEdited(note.updatedAt)
            saveNotes(notes)
        }
    })
})

noteBody.addEventListener('input', (e) => {
    notes.find((note) => {
        if (note.id === ID) {
            note.body = e.target.value
            note.updatedAt = moment().valueOf()
            dateElemet.textContent = generateLastEdited(note.updatedAt)
            saveNotes(notes)
        }
    })
})

document.querySelector('#remove-note').addEventListener('click', (e) => {
    removeNote(note.id)
    saveNotes(notes)
    location.assign('../notes-app/index.html')
})

window.addEventListener('storage', (e) => {
    // debugger
    // console.log(e)
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)
        note = notes.find((note) => note.id === ID)

        if (note === undefined) {
            location.assign('../notes-app/index.html')
        }
        noteTitle.value = note.title
        noteBody.value = note.body
        dateElemet.textContent = generateLastEdited(note.updatedAt)
    }
})