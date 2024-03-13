import axios from "axios";

const url = "http://localhost:3000/notes"


const getAllNotes = async () => {
    const resp = await axios.get(url);
    return resp.data
};


const createNote = async (notes) => {
    const ressp = await axios.post(url, newNote);
};


const deleteNote = async (id) => {
    const resp = await axios.delete(url);
}   




export {getAllNotes, createNote, deleteNote}