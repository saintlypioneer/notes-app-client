import styled from "styled-components";
import { useDispatch } from "react-redux";
import { createNote } from "../../redux/noteSlice";

function CreateNoteModal({setModalOpen, addNewNote}) {

  const dispatch = useDispatch();

  function addNewNote(e) {
    e.preventDefault();

    const title = e.target.elements.title.value;
    const content = e.target.elements.content.value;
    const file = e.target.elements.file.files[0];

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);

    if (file) {
        formData.append('mediaFile', file);
        formData.append('mediaType', file.type.split('/')[0]); // 'pdf', 'audio', 'video'...
    }

    dispatch(createNote(formData));
    setModalOpen(false);

    e.target.elements.title.value = "";
    e.target.elements.content.value = "";
    e.target.elements.file.value = "";
}

const handleSubmit = e => {
  e.preventDefault();
  addNewNote(e);
};

  return (
    <Modal>
      <div id="modal__content">
        <CloseButton onClick={() => setModalOpen(false)}>X</CloseButton>
        <div>
          <h2>Add New Note</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Title" name="title" />
            <textarea placeholder="Content" name="content" />
            <input type="file" name="file" />
            <button type="submit">Add Note</button>
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

export default CreateNoteModal;
