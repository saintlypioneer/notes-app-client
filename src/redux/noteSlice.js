import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// const API_BASE_URL = 'http://localhost:3002';
const API_BASE_URL = "https://notes-app-server-cr5j5yn2ca-uc.a.run.app";

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
  const response = await axios.get(`${API_BASE_URL}/api/notes`);
  return response.data;
});

export const createNote = createAsyncThunk('notes/createNote', async (note) => {
  const response = await axios.post(`${API_BASE_URL}/api/notes`, note);
  return response.data;
});

export const deleteNote = createAsyncThunk('notes/deleteNote', async (id) => {
  await axios.delete(`${API_BASE_URL}/api/notes/${id}`);
  return id;
});

export const updateNote = createAsyncThunk('notes/updateNote', async (note) => {
  const response = await axios.put(`${API_BASE_URL}/api/notes/${note._id}`, note);
  return response.data;
});

export const translateAllNotes = createAsyncThunk(
  'notes/translateAllNotes',
  async (language) => {
    const response = await axios.get(`${API_BASE_URL}/api/notes`);
    const notes = response.data;

    if (language === 'en') return notes;
    
    const translatedResponse = await axios.post(`${API_BASE_URL}/translate?targetLang=${language}`, notes);
    return translatedResponse.data;  // No PUT requests here
  }
);

const initialState = {
  notes: [],
  currentNote: null,
  status: 'idle',
  error: null,
  translationStatus: 'idle' 
};

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    getNote: (state, action) => {
      const id = action.payload;
      const existingNote = state.notes.find(note => note.id === id);
      if (existingNote) {
        state.currentNote = existingNote;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter(note => note._id !== action.payload);
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        const { _id, title, content } = action.payload;
        const existingNote = state.notes.find(note => note._id === _id);
        if (existingNote) {
          existingNote.title = title;
          existingNote.content = content;
        }
      })
      .addCase(translateAllNotes.pending, (state) => {
        state.translationStatus = 'loading';
      })
      .addCase(translateAllNotes.fulfilled, (state, action) => {
        state.notes = action.payload;  // Update local state
        state.translationStatus = 'succeeded';
      })
      .addCase(translateAllNotes.rejected, (state, action) => {
        state.translationStatus = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { getNote } = noteSlice.actions;

export default noteSlice.reducer;
