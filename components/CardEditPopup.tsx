import { useEffect, useState, useRef } from "react";

import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { unsetCard, selectCard } from "../slices/cardSlice";
import { selectLists, updateCardText } from "../slices/listsSlices";
import { setOverlay } from "../slices/overlaySlice";

import LabelNewPopup from "./LabelNewPopup";
import LabelEditPopup from "./LabelEditPopup";

import { ILabel } from "../types";
import { labelColors, ICard } from "../types";

import CloseIcon from "../icons/close.svg";
import PlusIcon from "../icons/plus.svg";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

function CardPopup() {
	const dispatch = useAppDispatch();
	const selectedCard = useAppSelector(selectCard);
	const lists = useAppSelector(selectLists);

	const [labels, setLabels] = useState<ILabel[]>([]);
	const [selectedLabel, setselectedLabel] = useState<null | ILabel>(null);
	const [labelNewPopupIsActive, setlabelNewPopupIsActive] = useState(false);

	const descriptionRef = useRef<HTMLTextAreaElement>(null);

	function save() {
		if (
			selectedCard === null ||
			descriptionRef.current === null ||
			descriptionRef.current.value === null ||
			descriptionRef.current.value.trim() === ""
		)
			return;

		const updatedCard: ICard = {
			id: selectedCard.id,
			listId: selectedCard.listId,
			text: descriptionRef.current.value,
			labels: selectedCard.labels,
		};

		dispatch(updateCardText(updatedCard));
		dispatch(unsetCard());
		dispatch(setOverlay(false));
	}

	useEffect(() => {
		if (selectedLabel) {
			setlabelNewPopupIsActive(false);
		}
	}, [selectedLabel]);

	useEffect(() => {
		if (labelNewPopupIsActive) {
			setselectedLabel(null);
		}
	}, [labelNewPopupIsActive]);

	useEffect(() => {
		const foundList = lists.find((list) => list.id === selectedCard?.listId);

		if (foundList) {
			const foundCard = foundList.cards.find(
				(card) => card.id === selectedCard?.id
			);

			if (foundCard) {
				setLabels(foundCard.labels);
			}
		}
	}, [lists]);

	return (
		<div className="w-screen h-screen fixed z-40">
			<div className="absolute px-4 flex flex-col bg-gray-50 w-[50rem] h-[36rem] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-sm z-40">
				<CloseIcon
					onClick={() => {
						dispatch(unsetCard());
					}}
					className="w-7 h-7 absolute top-2 right-2 hover:bg-red-400 rounded cursor-pointer"
				/>

				{selectedCard && labelNewPopupIsActive && (
					<LabelNewPopup
						listId={selectedCard.listId}
						id={selectedCard.id}
						labels={selectedCard.labels}
						text={selectedCard.text}
						setlabelNewPopupIsActive={setlabelNewPopupIsActive}
					/>
				)}

				{selectedLabel && (
					<LabelEditPopup
						listId={selectedLabel.listId}
						id={selectedLabel.id}
						cardId={selectedLabel.cardId}
						text={selectedLabel.text}
						setselectedLabel={setselectedLabel}
						color={selectedLabel.color}
					/>
				)}

				<h1 className="mt-5 text-2xl">Edit card</h1>

				<div className="mt-9 flex flex-col space-y-2">
					<h2 className="text-base font-medium">Labels</h2>
					<div className="flex flex-wrap items-center">
						{labels.map((label) => (
							<div
								onClick={() => {
									setselectedLabel(label);
								}}
								key={label.id}
								className="rounded text-white px-3 py-1 m-0.5 cursor-pointer"
								style={{ backgroundColor: labelColors[label.color] }}
							>
								{label.text}
							</div>
						))}
						<button
							onClick={() => {
								setlabelNewPopupIsActive(true);
							}}
							className="p-1.5 bg-gray-200 hover:bg-gray-300 rounded-lg m-0.5 ml-1 flex space-x-0.5 items-center"
						>
							<PlusIcon className="w-5 h-5 stroke-2" />
						</button>
					</div>
				</div>

				<div className="mt-12 flex flex-col space-y-2">
					<h2 className="text-base font-medium">Description</h2>
					<textarea
						ref={descriptionRef}
						className="h-64 p-2 rounded-sm border border-gray-200 resize-none focus:outline-none"
					>
						{selectedCard?.text}
					</textarea>
				</div>

				<div className="absolute left-1/2 transform -translate-x-1/2 top-4  bg-emerald-300 w-1/2 h-3/12"></div>

				<button
					onClick={save}
					className="text-lg text-zinc-100 p-6 py-1 bg-blue-500 hover:bg-blue-600 rounded-3xl self-end mt-6 mr-3"
				>
					Save
				</button>
			</div>
		</div>
	);
}

export default CardPopup;
