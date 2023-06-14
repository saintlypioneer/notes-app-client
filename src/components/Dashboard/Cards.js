import { useSelector } from "react-redux";
import styled from "styled-components";
import { deleteNote } from "../../redux/noteSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchNotes, fetchSharedNotes } from "../../redux/noteSlice";
import SharingNoteModal from "../Modals/SharingNoteModal";
import { useState } from "react";
import jwt_decode from "jwt-decode";

function Cards({
  setCurrentNote,
  setUpdatingModalOpen,
  dataFilter = "default",
}) {
  const notes = useSelector((state) => state.note.notes);
  const sharedNotes = useSelector((state) => state.note.sharedNotes);
  let data = [];
  const token = useSelector((state) => state.auth.token);


  // const [data, setData] = useState([]);

  const [sharingModalOpen, setSharingModalOpen] = useState(false);
  const [currentNoteData, setCurrentNoteData] = useState({});

  const dispatch = useDispatch();

  // Helper function to generate a random background color
  function getRandomColor() {
    const colors = [
      "rgba(244, 67, 54, 0.15)",
      "rgba(233, 30, 99, 0.15)",
      "rgba(156, 39, 176, 0.15)",
      "rgba(103, 58, 183, 0.15)",
      "rgba(63, 81, 181, 0.15)",
      "rgba(33, 150, 243, 0.15)",
      "rgba(3, 169, 244, 0.15)",
      "rgba(0, 188, 212, 0.15)",
      "rgba(0, 150, 136, 0.15)",
      "rgba(76, 175, 80, 0.15)",
      "rgba(139, 195, 74, 0.15)",
      "rgba(205, 220, 57, 0.15)",
      "rgba(255, 235, 59, 0.15)",
      "rgba(255, 193, 7, 0.15)",
      "rgba(255, 152, 0, 0.15)",
      "rgba(255, 87, 34, 0.15)",
      "rgba(121, 85, 72, 0.15)",
      "rgba(158, 158, 158, 0.15)",
      "rgba(96, 125, 139, 0.15)",
      "rgba(0, 0, 0, 0.15)",
    ];

    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
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

  function shareNote(note) {
    setCurrentNoteData(note);
    setSharingModalOpen(true);
  }

  useEffect(() => {
    if (dataFilter === "default") {
      dispatch(fetchNotes());
    } else if (dataFilter === "shared-with-me") {
      dispatch(fetchSharedNotes());
    }
  }, [dataFilter, dispatch]);

  if (dataFilter === "default") {
    data = notes;
  } else if (dataFilter === "shared-with-me") {
    data = sharedNotes;
  } else if (dataFilter === "shared-with-others") {
    data = notes.filter(
      (note) => note.sharedWith && note.sharedWith.length > 0
    );
  }

  const hasWritePermission = (note) => {
    if (!token || !note.sharedWith) return false;
  
    // Decode the token to get the userId
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.userId || decodedToken.sub; // It might be stored under 'userId' or 'sub' depending on the token structure
  
    // Check if the user has write permissions
    const sharedInfo = note.sharedWith.find(shared => shared.userId === userId);
    console.log(sharedInfo);
    return sharedInfo && sharedInfo.permission === "write";
  };

  return (
    <Container>
      {data.map((note) => (
        <NoteCard key={note._id} style={{ backgroundColor: getRandomColor() }}>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
          <div id="overlay">
            <div>
              {dataFilter !== "shared-with-me" || hasWritePermission(note, token) ? (
                <button onClick={() => editNote(note)}>Edit</button>
              ) : null}
              <button onClick={() => deleteSpecificNote(note._id)}>Delete</button>
              <button onClick={() => shareNote(note)}>Share</button>
            </div>
          </div>
        </NoteCard>
      ))}
      {sharingModalOpen && (
        <SharingNoteModal
          setSharingModalOpen={setSharingModalOpen}
          currentNote={currentNoteData}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 10px;
  align-items: start;
`;

const NoteCard = styled.div`
  background-color: white;
  min-width: 250px;
  max-width: 350px;
  height: 250px;
  align-items: center;
  border-radius: 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 20px;
  transition: all 0.3s ease-in-out;
  position: relative;
  overflow-y: scroll;

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

export default Cards;
