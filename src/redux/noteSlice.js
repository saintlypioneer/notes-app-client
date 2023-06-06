import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'https://notes-app-server-cr5j5yn2ca-uc.a.run.app/api';

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
  const response = await axios.get(`${API_BASE_URL}/notes`);
  return response.data;
});

export const createNote = createAsyncThunk('notes/createNote', async (note) => {
  const response = await axios.post(`${API_BASE_URL}/notes`, note);
  return response.data;
});

export const deleteNote = createAsyncThunk('notes/deleteNote', async (id) => {
  await axios.delete(`${API_BASE_URL}/notes/${id}`);
  return id;
});

export const updateNote = createAsyncThunk('notes/updateNote', async (note) => {
  const response = await axios.put(`${API_BASE_URL}/notes/${note._id}`, note);
  return response.data;
});

const initialState = {
  notes: [],
  currentNote: null,
  status: 'idle',
  error: null
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
      });
  }
});

export const { getNote } = noteSlice.actions;

export default noteSlice.reducer;
