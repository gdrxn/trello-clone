import { useEffect, useRef, useState } from "react";
import EditIcon from "../icons/edit.svg";
import DeleteIcon from "../icons/delete.svg";
import OpenIcon from "../icons/open.svg";
import { ICard } from "../types";
import { setOverlay, selectOverlay } from "../slices/overlaySlice";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { removeCard, updateCardText } from "../slices/listsSlices";
import Label from "./Label";
import { setCard } from "../slices/cardSlice";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

function Card(props: ICard) {
	const dispatch = useAppDispatch();
	const overlayIsActive = useAppSelector(selectOverlay);

	const [popUpIsActive, setpopUpIsActive] = useState(false);
	const [showLabelText, setshowLabelText] = useState(false);

	const textEl = useRef<HTMLParagraphElement>(null);

	function toggleLabelText() {
		setshowLabelText((current) => !current);
	}

	function enablePopUp() {
		setpopUpIsActive(true);
		dispatch(setOverlay(true));
	}

	function deleteCard() {
		dispatch(removeCard(props));
		dispatch(setOverlay(false));
	}

	function updateText() {
		if (
			textEl.current === null ||
			textEl.current.textContent === null ||
			textEl.current.textContent.trim() === ""
		)
			return;

		const updatedCard: ICard = {
			id: props.id,
			listId: props.listId,
			text: textEl.current.textContent,
			labels: props.labels,
		};

		dispatch(updateCardText(updatedCard));
		dispatch(setOverlay(false));
	}

	useEffect(() => {
		if (!overlayIsActive) {
			setpopUpIsActive(false);
		}
		if (textEl.current) {
			textEl.current.textContent = props.text;
		}
	}, [overlayIsActive]);

	return (
		<div className="relative">
			<section
				className={
					popUpIsActive
						? "bg-neutral-50 rounded py-2 px-1 flex flex-col group relative break-all z-30"
						: "bg-neutral-50 rounded py-2 px-1 flex flex-col group relative break-all"
				}
			>
				{overlayIsActive && popUpIsActive && (
					<div className="flex flex-col left-72 top-0 absolute z-30 rounded bg-opacity-95 space-y-1  items-start">
						<button
							onClick={() => {
								dispatch(setCard(props));
							}}
							className="flex items-center space-x-2 py-1 px-2 text-gray-100 bg-gray-800 rounded whitespace-nowrap"
						>
							<OpenIcon className="w-4 h-4" />
							<span>Open card</span>
						</button>
						<button
							onClick={() => {
								deleteCard();
							}}
							className="flex items-center space-x-2 py-1 px-2 text-gray-100 bg-gray-800 rounded whitespace-nowrap"
						>
							<DeleteIcon className="w-4 h-4" />
							<span>Delete card</span>
						</button>
					</div>
				)}
				<div className="p-1 flex flex-wrap">
					{props.labels.map((label) => (
						<Label
							onClick={() => {
								toggleLabelText();
							}}
							{...label}
							showLabelText={showLabelText}
						/>
					))}
				</div>
				<p
					ref={textEl}
					onChange={(e) => {
						if (textEl.current && e.currentTarget.textContent) {
							textEl.current.textContent = e.currentTarget.textContent;
						}
					}}
					className="w-full p-1"
					contentEditable={popUpIsActive ? "true" : "false"}
				>
					{props.text}
				</p>
				{!popUpIsActive && (
					<button
						className="absolute right-1 top-1 w-7 h-7 p-1.5 hover:bg-gray-200 rounded hidden group-hover:block"
						onClick={() => {
							enablePopUp();
						}}
					>
						<EditIcon />
					</button>
				)}
			</section>

			{overlayIsActive && popUpIsActive && (
				<button
					onClick={() => {
						updateText();
					}}
					className="bg-blue-500 hover:bg-blue-600 py-1 w-16 rounded  mt-1.5 relative z-30"
				>
					Save
				</button>
			)}
		</div>
	);
}

export default Card;
