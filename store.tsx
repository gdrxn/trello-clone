import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import cardSlice from "./slices/cardSlice";
import listsSlices from "./slices/listsSlices";
import overlaySlice from "./slices/overlaySlice";

const persistConfig = {
	key: "root",
	version: 1,
	storage,
	blacklist: ["overlay", "card"],
};

const rootReducer = combineReducers({
	lists: listsSlices,
	overlay: overlaySlice,
	card: cardSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// config the store
const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export default store;
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
