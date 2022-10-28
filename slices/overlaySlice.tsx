import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// create a slice
export const overlaySlice = createSlice({
	name: "overlay",
	initialState: {
		value: false,
	},
	reducers: {
		setOverlay(state, action: PayloadAction<boolean>) {
			state.value = action.payload;
		},
	},
});

// export the action
export const { setOverlay } = overlaySlice.actions;

export const selectOverlay = (state: RootState) => state.overlay.value;

export default overlaySlice.reducer;
