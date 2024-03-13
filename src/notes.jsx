function Note({ note, deleteNote, toggleImportance }) {
  const label = note.important ? "Make unimportant" : "Make important";
  return (
    <li>
      {note.content}
      <button onClick={() => deleteNote(note.id)}>x</button>
      <button onClick={() => toggleImportance(note.id)}>{label}</button>
    </li>
  );
}

export default Note;