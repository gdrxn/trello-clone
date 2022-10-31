import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

import { IList, ICard, ILabel } from "../types";

// create a slice
export const listsSlice = createSlice({
	name: "lists",
	initialState: {
		store: [] as IList[],
	},
	reducers: {
		addList(state, action: PayloadAction<IList>) {
			state.store.push(action.payload);
		},
		removeList(state, action: PayloadAction<IList>) {
			state.store = state.store.filter((list) => list.id !== action.payload.id);
		},
		changeListName(
			state,
			action: PayloadAction<{ id: string; newName: string }>
		) {
			const foundList = state.store.find(
				(list) => list.id === action.payload.id
			);

			if (foundList) {
				foundList.name = action.payload.newName;
			}
		},
		addCard(state, action: PayloadAction<ICard>) {
			const foundList = state.store.find(
				(list) => list.id === action.payload.listId
			);

			if (foundList) {
				foundList.cards.push(action.payload);
			}
		},
		removeCard(state, action: PayloadAction<ICard>) {
			const foundList = state.store.find(
				(list) => list.id === action.payload.listId
			);
			if (foundList) {
				foundList.cards = foundList.cards.filter(
					(card) => card.id !== action.payload.id
				);
			}
		},
		updateCardText(state, action: PayloadAction<ICard>) {
			const foundList = state.store.find(
				(list) => list.id === action.payload.listId
			);

			if (foundList) {
				const foundCard = foundList.cards.find(
					(card) => card.id === action.payload.id
				);

				if (foundCard) {
					foundCard.text = action.payload.text;
				}
			}
		},
		addLabel(state, action: PayloadAction<ILabel>) {
			const foundList = state.store.find(
				(list) => list.id === action.payload.listId
			);

			if (foundList) {
				const foundCard = foundList.cards.find(
					(card) => card.id === action.payload.cardId
				);

				if (foundCard) {
					foundCard.labels.push(action.payload);
				}
			}
		},
		removeLabel(state, action: PayloadAction<ILabel>) {
			const foundList = state.store.find(
				(list) => list.id === action.payload.listId
			);

			if (foundList) {
				const foundCard = foundList.cards.find(
					(card) => card.id === action.payload.cardId
				);

				if (foundCard) {
					foundCard.labels = foundCard.labels.filter(
						(label) => label.id !== action.payload.id
					);
				}
			}
		},
		editLabel(state, action: PayloadAction<ILabel>) {
			const foundList = state.store.find(
				(list) => list.id === action.payload.listId
			);

			if (foundList) {
				const foundCard = foundList.cards.find(
					(card) => card.id === action.payload.cardId
				);

				if (foundCard) {
					const foundLabel = foundCard.labels.find(
						(label) => label.id === action.payload.id
					);
					if (foundLabel) {
						foundLabel.text = action.payload.text;
						foundLabel.color = action.payload.color;
					}
				}
			}
		},
	},
});

// export the action
export const {
	addList,
	removeList,
	changeListName,
	addCard,
	removeCard,
	updateCardText,
	addLabel,
	removeLabel,
	editLabel,
} = listsSlice.actions;

export const selectLists = (state: RootState) => state.lists.store;

export default listsSlice.reducer;
