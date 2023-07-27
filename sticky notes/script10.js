const containerElement = document.getElementById("container");
const btnadd = document.getElementsByClassName("btn-add")[0];

function getAppStorage() {
    return JSON.parse(localStorage.getItem("ntn-app") || "[]");

}
getAppStorage().forEach(element => {
    const textElement = createTextElement(element.id, element.content);
    containerElement.insertBefore(textElement, btnadd);
});

function createTextElement(id, content) {
    const textElement = document.createElement('textarea');
    textElement.classList.add('sticky');
    textElement.value = content;
    textElement.placeholder = 'Enter your Notes';


    textElement.addEventListener("change", () => {
        updateNote(id, textElement.value);
    });
    textElement.addEventListener("dblclick", () => {
        const check = confirm("are you sure to Delete?");
        if (check) {
            deleteNotes(id, textElement);
        }
    });
    return textElement;
}

//add new sticky note
function addSticky() {
    const notes = getAppStorage();
    const noteobject = {
        id: Math.floor(Math.random() * 100000),
        content: ""
    }
    const textElement = createTextElement(noteobject.id, noteobject.content);
    containerElement.insertBefore(textElement, btnadd);
    notes.push(noteobject);
    saveNotes(notes);
}

btnadd.addEventListener('click', () => addSticky());

function saveNotes(notes) {
    localStorage.setItem("ntn-app", JSON.stringify(notes));
}
//update sticky note

function updateNote(id, content) {
    const notes = getAppStorage();
    const updateElement = notes.filter((note) => note.id == id)[0];
    updateElement.content = content;
    saveNotes(notes);
}

function deleteNotes(id, textElement) {
    const notes = getAppStorage().filter((note) => note.id != id);

    saveNotes(notes);
    containerElement.removeChild(textElement);
}