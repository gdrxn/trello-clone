import { useState, useRef, RefObject } from "react";
import CloseIcon from "../icons/close.svg";
import OptionIcon from "../icons/options.svg";
import PlusIcon from "../icons/plus.svg";
import Card from "./Card";
import { IList } from "../types";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import { addCard, removeList, changeListName } from "../slices/listsSlices";

export const useAppDispatch: () => AppDispatch = useDispatch;

function List(props: IList) {
	const dispatch = useAppDispatch();
	const [isEditingCardName, setIsEditingCardName] = useState(false);
	const cardRef = useRef<HTMLTextAreaElement>(null);
	const [listName, setListName] = useState(props.name);
	const [listPopUpIsActive, setListPopUpIsActive] = useState(false);

	function saveCard() {
		if (!cardRef.current || cardRef.current.value.trim() === "") return;

		const card = {
			text: cardRef.current.value,
			listId: props.id,
			id: uuidv4(),
			labels: [],
		};

		dispatch(addCard(card));

		cardRef.current.value = "";
	}

	function deleteList() {
		dispatch(removeList(props));
	}

	function editListName(newName: string) {
		if (newName.trim()) return;

		setListName(newName);
		dispatch(changeListName({ id: props.id, newName: newName }));
	}

	return (
		<article className="flex flex-shrink-0 flex-col px-2 w-72 bg-slate-100 rounded bg-opacity-95 max-h-full relative">
			{listPopUpIsActive && (
				<div className="flex flex-col bg-white left-64 w-64 top-10 absolute z-20 rounded bg-opacity-95">
					<div className="flex items-center justify-center  mx-3 py-2 border-gray-200 border-b">
						<span>List actions</span>
						<CloseIcon
							onClick={() => {
								setListPopUpIsActive(false);
							}}
							className="absolute right-1 w-5 h-5 cursor-pointer"
						/>
					</div>
					<button className="py-1.5 text-start px-3 hover:bg-gray-100">
						Edit
					</button>
					<button
						onClick={() => {
							deleteList();
						}}
						className="py-1.5 text-start px-3 hover:bg-gray-100"
					>
						Delete
					</button>
					<button className="py-1.5 text-start px-3 hover:bg-gray-100">
						Edit labels
					</button>
				</div>
			)}

			<div className="flex w-full space-x-2 py-2">
				<input
					type="text"
					value={listName}
					onChange={(e) => editListName(e.target.value)}
					className="flex-1 bg-gray-200 bg-opacity-0 rounded-sm outline-blue-400 font-medium px-1 focus:bg-white"
				/>

				<button
					className="p-1 hover:bg-gray-300 rounded-sm"
					onClick={() => {
						setListPopUpIsActive(true);
					}}
				>
					<OptionIcon className="w-6 h-6" />
				</button>
			</div>

			<div className="space-y-2 pb-2">
				{props.cards.map((card) => (
					<Card
						text={card.text}
						listId={props.id}
						id={card.id}
						labels={card.labels}
						key={card.id}
					/>
				))}

				{!isEditingCardName ? (
					<button
						onClick={() => {
							setIsEditingCardName(true);
						}}
						className="flex items-center space-x-1.5 w-full py-2 pl-2 hover:bg-gray-300 rounded"
					>
						<PlusIcon className="w-5 h-5" />
						<span className="text-gray-600 text-sm">Add a card</span>
					</button>
				) : (
					<div>
						<textarea
							ref={cardRef}
							name="card"
							className="w-full h-16 rounded-sm p-2 resize-none"
						></textarea>
						<div className="flex space-x-2 py-1.5">
							<button
								className="bg-blue-500 py-1.5 px-2 rounded text-white text-sm font-md hover:bg-blue-600"
								onClick={() => {
									saveCard();
								}}
							>
								Add Card
							</button>
							<button
								className="text-gray-500 hover:text-gray-600"
								onClick={() => {
									setIsEditingCardName(false);
								}}
							>
								<CloseIcon className="w-6 h-6" />
							</button>
						</div>
					</div>
				)}
			</div>
		</article>
	);
}

export default List;
