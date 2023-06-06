import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { createNote, deleteNote, updateNote, fetchNotes } from "./redux/noteSlice";
import { useEffect } from "react";

function App() {
  const notes = useSelector((state) => state.note.notes);
  const [modalOpen, setModalOpen] = useState(false);
  const [updatingModalOpen, setUpdatingModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState({
    _id: "",
    title: "",
    content: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  function addNewNote(e) {
    e.preventDefault();

    const title = e.target.elements[0].value;
    const content = e.target.elements[1].value;

    const newNote = {
      title,
      content,
    };

    dispatch(createNote(newNote));
    setModalOpen(false);

    e.target.elements[0].value = "";
    e.target.elements[1].value = "";
  }

  function deleteSpecificNote(noteId) {
    dispatch(deleteNote(noteId));
    console.log(noteId);
  }

  function editNote(note) {
    setUpdatingModalOpen(true);
    setCurrentNote({
      _id: note._id,
      title: note.title,
      content: note.content,
    });
  }

  function updateCurrentNote(e) {
    e.preventDefault();
    const title = e.target.elements[0].value;
    const content = e.target.elements[1].value;

    const updatedNoteObj = {
      _id: currentNote._id,
      title,
      content,
    };

    dispatch(updateNote(updatedNoteObj));
    // console.log(updatedNoteObj);
    setUpdatingModalOpen(false);
  }

  return (
    <Container>
      <Cards>
        <AddNewNote onClick={() => setModalOpen(true)}>
          <p>+</p>
        </AddNewNote>
        {notes.map((note) => (
          <NoteCard key={note._id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <div id="overlay">
              <div>
                <button onClick={() => editNote(note)} >Edit</button>
                <button onClick={() => deleteSpecificNote(note._id)}>Delete</button>
              </div>
            </div>
          </NoteCard>
        ))}
      </Cards>
      {modalOpen && (
        <Modal>
          <div id="modal__content">
            <CloseButton onClick={() => setModalOpen(false)}>X</CloseButton>
            <div>
              <h2>Add New Note</h2>
              <form onSubmit={(e) => addNewNote(e)}>
                <input type="text" placeholder="Title" />
                <textarea placeholder="Content" />
                <button type="submit">Add Note</button>
              </form>
            </div>
          </div>
        </Modal>
      )}
      {updatingModalOpen && (
        <Modal>
          <div id="modal__content">
            <CloseButton onClick={() => setUpdatingModalOpen(false)}>X</CloseButton>
            <div>
              <h2>Update Note</h2>
              <form onSubmit={(e) => updateCurrentNote(e)}>
                <input type="text" placeholder="Title" value={currentNote.title} onChange={e => setCurrentNote({...currentNote, title: e.target.value})} />
                <textarea placeholder="Content" value={currentNote.content} onChange={e => setCurrentNote({...currentNote, content: e.target.value})} />
                <button type="submit">Update</button>
              </form>
            </div>
          </div>
        </Modal>
      )}
    </Container>
  );
}

// Modal CSS
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);

  #modal__content {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    position: relative;

    & > div {
      & > form {
        display: flex;
        flex-direction: column;
        min-width: 300px;
        margin-top: 10px;

        & > input,
        textarea {
          margin-bottom: 10px;
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #ededed;
        }

        & > button {
          padding: 10px;
          border-radius: 5px;
          border: 1px solid black;
          background-color: #ededed;
          color: black;
          transition: all 0.3s ease-in-out;

          &:hover {
            cursor: pointer;
            background-color: black;
            color: white;
          }
        }
      }
    }
  }
`;

// Close Button CSS
const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: transparent;
  border: 1px solid black;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #ededed;
  padding: 20px;
`;

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 10px;
  align-items: start;
`;

const AddNewNote = styled.div`
  background-color: white;
  min-width: 250px;
  max-width: 350px;
  height: 250px;
  padding: 0;
  font-size: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  p {
    padding: 20px;
    margin: 0;
    padding: 0;
    font-weight: 300;
    color: rgba(0, 0, 0, 0.2);
  }
`;

const NoteCard = styled.div`
  background-color: white;
  min-width: 250px;
  max-width: 350px;
  height: 250px;
  padding: 0;
  align-items: center;
  border-radius: 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 10px;
  transition: all 0.3s ease-in-out;
  position: relative;

  &:hover {
    #overlay {
      display: block;
    }
  }

  #overlay {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 20px;

    & > div {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 20px;

      & > button {
        background: #5e5df0;
        border-radius: 999px;
        box-shadow: #5e5df0 0 10px 20px -10px;
        box-sizing: border-box;
        color: #ffffff;
        cursor: pointer;
        font-family: Inter, Helvetica, "Apple Color Emoji", "Segoe UI Emoji",
          NotoColorEmoji, "Noto Color Emoji", "Segoe UI Symbol", "Android Emoji",
          EmojiSymbols, -apple-system, system-ui, "Segoe UI", Roboto,
          "Helvetica Neue", "Noto Sans", sans-serif;
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;
        opacity: 1;
        outline: 0 solid transparent;
        padding: 8px 18px;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        width: 150px;
        word-break: break-word;
        border: 0;
      }
    }
  }

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }

  h2 {
    /* background-color: aliceblue; */
    text-align: center;
    font-size: 1.8rem;
    border-bottom: 1px solid grey;
    padding-bottom: 5px;
    margin-bottom: 5px;
  }

  p {
    /* background-color: aqua; */
  }
`;

export default App;
