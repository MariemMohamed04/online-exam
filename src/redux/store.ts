import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

const emailSlice = createSlice({
  name: 'email',
  initialState: { value: '' },
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setEmail } = emailSlice.actions;

const store = configureStore({
  reducer: {
    email: emailSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
