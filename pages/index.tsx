import type { NextPage } from "next";
import Head from "next/head";
import { useState, useRef } from "react";
import List from "../components/List";
import CloseIcon from "../icons/close.svg";
import PlusIcon from "../icons/plus.svg";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import { selectLists, addList } from "../slices/listsSlices";
import { IList } from "../types";
import type { RootState, AppDispatch } from "../store";
import { v4 as uuidv4 } from "uuid";
import { selectOverlay, setOverlay } from "../slices/overlaySlice";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const Home: NextPage = () => {
	const dispatch = useAppDispatch();
	const lists = useAppSelector(selectLists);
	const overlayIsActive = useAppSelector(selectOverlay);

	const [isEditingListName, setIsEditingListName] = useState<boolean>(false);

	const listNameRef = useRef<HTMLInputElement>(null);

	function saveList() {
		if (!listNameRef.current || !listNameRef.current.value) return;

		const list: IList = {
			name: listNameRef.current.value,
			id: uuidv4(),
			cards: [],
		};
		dispatch(addList(list));

		listNameRef.current.value = "";
	}
	return (
		<div className="min-h-screen min-w-fit bg-gradient-to-r from-cyan-500 to-purple-500 relative">
			{overlayIsActive && (
				<div
					onClick={() => {
						dispatch(setOverlay(false));
					}}
					className="h-full w-full bg-black z-10 absolute opacity-40"
				></div>
			)}
			<Head>
				<title>Trello</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="flex h-full items-start pt-10 pl-7 pb-5 space-x-2.5 pr-7">
				{lists.map((list) => (
					<List
						name={list.name}
						id={list.id}
						cards={list.cards}
						key={list.id}
					/>
				))}

				{!isEditingListName ? (
					<button
						className="flex items-center space-x-2 h-10 w-72 shrink-0 pl-3 bg-gray-100 rounded-sm bg-opacity-20 shadow-lg text-white"
						onClick={() => {
							setIsEditingListName(true);
						}}
					>
						<PlusIcon className="w-6 h-6" />
						<span> Add another list</span>
					</button>
				) : (
					<div className="bg-gray-200 h-fit p-1.5 rounded space-y-2 bg-opacity-90 w-72 shrink-0">
						<input
							type="text"
							className="py-1 rounded-sm w-full px-2 focus:outline-blue-400"
							ref={listNameRef}
						/>

						<div className="flex space-x-2 items-center shrink-0">
							<button
								className="bg-blue-500 py-1.5 px-2 rounded text-white text-sm font-md hover:bg-blue-600"
								onClick={() => {
									saveList();
								}}
							>
								Add List
							</button>
							<button
								className="text-gray-500 hover:text-gray-600"
								onClick={() => {
									setIsEditingListName(false);
								}}
							>
								<CloseIcon className="w-6 h-6" />
							</button>
						</div>
					</div>
				)}
			</main>
		</div>
	);
};

export default Home;
