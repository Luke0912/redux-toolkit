/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Habit {
  _id: string;
  name: string;
  frequency: "Daily" | "Weekly";
  completedDates: string[];
  createdAt: string;
}

interface RequestPayload {
    name: string;
    frequency: string;
}

interface ResponseBody {
    habit:Habit
  }

interface HabitState {
  habits: Habit[];
  isLoading: boolean;
  error: null | string;
}

const initialState: HabitState = {
  habits: [],
  isLoading: false,
  error: null,
};


export const createHabit = createAsyncThunk<ResponseBody, RequestPayload>(
  "/habits/createHabits",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post<ResponseBody>(
        "http://localhost:3001/v1/api/habit",
         payload
        );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create habit"
      );
    }
  }
);

export const fetchHabits = createAsyncThunk<Habit[]>(
  "habits/fetchHabits",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3001/v1/api/habit");
      return response.data.habits; // Assuming your API returns an array of habits
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch habits");
    }
  }
);

const habitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    toggleHabit: (
      state,
      action: PayloadAction<{ _id: string; date: string }>
    ) => {
      const habit = state.habits.find((h) => h._id === action.payload._id);
      if (habit) {
        const index = habit.completedDates.indexOf(action.payload.date);
        if (index > -1) {
          habit.completedDates.splice(index, 1);
        } else {
          habit.completedDates.push(action.payload.date);
        }
      }
    },
    deleteHabit: (state, action: PayloadAction<{ _id: string }>) => {
      state.habits = state.habits.filter(
        (habit) => habit._id !== action.payload._id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabits.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.isLoading = false;
        state.habits = action.payload;
      })
      .addCase(fetchHabits.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch habits";
      })
      .addCase(createHabit.fulfilled, (state,ResponseBody) => {
        state.habits.push(ResponseBody.payload.habit); // appending the new habit
      });
  },
});

export const {toggleHabit, deleteHabit} = habitSlice.actions;
export default habitSlice.reducer;
