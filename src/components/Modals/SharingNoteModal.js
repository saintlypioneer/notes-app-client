import { useState } from "react";
import { useDispatch } from "react-redux";
import { shareNote } from "../../redux/noteSlice";
import styled from "styled-components";

function SharingNoteModal({ setSharingModalOpen, currentNote }) {
  const [email, setEmail] = useState("");
  const [permission, setPermission] = useState("read");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      alert("Email is required");
      return;
    }

    dispatch(shareNote({
      noteId: currentNote._id,
      email,
      permission
    }));
    
    setSharingModalOpen(false);
  };

  return (
    <Modal>
      <div id="modal__content">
        <CloseButton onClick={() => setSharingModalOpen(false)}>X</CloseButton>
        <div>
          <h2>Share Note</h2>
          <p>{currentNote.title}</p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <select value={permission} onChange={(e) => setPermission(e.target.value)}>
              <option value="read">Read</option>
              <option value="write">Write</option>
            </select>
            <button type="submit">Share</button>
          </form>
        </div>
      </div>
    </Modal>
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

      &>p{
        margin: 10px 0;
        color: gray;
      }

      & > form {
        display: flex;
        flex-direction: column;
        min-width: 300px;
        margin-top: 10px;

        & > input,
        textarea, select {
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

export default SharingNoteModal;
