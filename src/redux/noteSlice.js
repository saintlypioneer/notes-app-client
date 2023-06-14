import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3002';

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async (_, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;
  const response = await axios.get(`${API_BASE_URL}/api/notes`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
});

export const createNote = createAsyncThunk('notes/createNote', async (note, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;
  const response = await axios.post(`${API_BASE_URL}/api/notes`, note, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
});

export const deleteNote = createAsyncThunk('notes/deleteNote', async (id, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;
  await axios.delete(`${API_BASE_URL}/api/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return id;
});

export const updateNote = createAsyncThunk('notes/updateNote', async (note, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;
  const response = await axios.put(`${API_BASE_URL}/api/notes/${note._id}`, note, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
});

export const shareNote = createAsyncThunk('notes/shareNote', async ({ noteId, email, permission }, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;
  const response = await axios.post(`${API_BASE_URL}/api/notes/${noteId}/share`, { email, permission }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
});

export const fetchSharedNotes = createAsyncThunk('notes/fetchSharedNotes', async (_, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;
  const response = await axios.get(`${API_BASE_URL}/api/shared-notes`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
});

export const translateAllNotes = createAsyncThunk('notes/translateAllNotes', async (language, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;
  const response = await axios.get(`${API_BASE_URL}/api/notes`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const notes = response.data;

  if (language === 'en') return notes;

  const translatedResponse = await axios.post(`${API_BASE_URL}/translate?targetLang=${language}`, notes, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return translatedResponse.data;
});

const initialState = {
  notes: [],
  sharedNotes: [],
  currentNote: null,
  status: 'idle',
  sharedStatus: 'idle',
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
        const index = state.notes.findIndex(note => note._id === action.payload._id);
        state.notes[index] = action.payload;
      })
      .addCase(translateAllNotes.fulfilled, (state, action) => {
        state.notes = action.payload;
      })
      .addCase(shareNote.fulfilled, (state, action) => {
        const index = state.notes.findIndex(note => note._id === action.payload._id);
        state.notes[index].sharedWith = action.payload.sharedWith;
      })
      .addCase(fetchSharedNotes.pending, (state) => {
        state.sharedStatus = 'loading';
      })
      .addCase(fetchSharedNotes.fulfilled, (state, action) => {
        state.sharedStatus = 'succeeded';
        state.sharedNotes = action.payload;
      })
      .addCase(fetchSharedNotes.rejected, (state, action) => {
        state.sharedStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { getNote } = noteSlice.actions;

export default noteSlice.reducer;
