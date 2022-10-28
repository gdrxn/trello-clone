import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ICard } from "../types";

// create a slice
export const cardSlice = createSlice({
	name: "card",
	initialState: {
		details: null as null | ICard,
	},
	reducers: {
		setCard(state, action: PayloadAction<ICard>) {
			state.details = action.payload;
		},
		removeCard(state) {
			state.details = null;
		},
	},
});

// export the action
export const { setCard, removeCard } = cardSlice.actions;

export const selectCard = (state: RootState) => state.card.details;

export default cardSlice.reducer;
