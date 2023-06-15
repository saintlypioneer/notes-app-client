import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { createNote, deleteNote, updateNote, fetchNotes } from "./redux/noteSlice";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import AllRoutes from "./components/AllRoutes";
import CreateNoteModal from "./components/Modals/CreateNoteModal";
import UpdateNoteModal from "./components/Modals/UpdateNoteModal";

function App() {

  const [modalOpen, setModalOpen] = useState(false);
  const [updatingModalOpen, setUpdatingModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState({
    _id: "",
    title: "",
    content: "",
  });
  const {error, status, isAuthenticated} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const translationStatus = useSelector(
    (state) => state.note.translationStatus
  );

  useEffect(() => {

    if (status != "idle" && error != null) {
      alert(error);
    }

  }, [status, error, isAuthenticated]);

  function addNewNote(e) {
    e.preventDefault();

    const title = e.target.elements[0].value;
    const content = e.target.elements[1].value;
    const file = e.target.elements[2].files[0];

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);

    if (file) {
      formData.append('mediaFile', file);
      formData.append('mediaType', file.type.split('/')[0]); // 'pdf', 'audio', 'video'...
    }

    dispatch(createNote(formData));
    setModalOpen(false);

    e.target.elements[0].value = "";
    e.target.elements[1].value = "";
    e.target.elements[2].value = "";
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
    setUpdatingModalOpen(false);
  }

  return (
    <Container>
      <Navbar setModalOpen={setModalOpen} />
      <AllRoutes setCurrentNote={setCurrentNote} setUpdatingModalOpen={setUpdatingModalOpen} />
      {modalOpen && <CreateNoteModal addNewNote={addNewNote} setModalOpen={setModalOpen} />}
      {updatingModalOpen && <UpdateNoteModal setUpdatingModalOpen={setUpdatingModalOpen} setCurrentNote={setCurrentNote} updateCurrentNote={updateCurrentNote} currentNote={currentNote}/>}
      {
        translationStatus=="loading" && <LoadingScreen>
          <h1>Loading...</h1>
        </LoadingScreen>
      }
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
  overflow-y: scroll;
`;

const LoadingScreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(5px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1{
    font-size: 2rem;
    font-weight: 400;
  }

`;

export default App;
