import React, { useEffect, useRef, useState, RefObject } from "react";
import { ICard } from "../types";
import EditIcon from "../icons/edit.svg";
import { setOverlay, selectOverlay } from "../slices/overlaySlice";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { removeCard, updateCardText } from "../slices/listsSlices";
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

function Card({ id, text, listId }: ICard) {
	const overlayIsActive = useAppSelector(selectOverlay);
	const [popUpIsActive, setpopUpIsActive] = useState(false);

	const textEl = useRef<HTMLParagraphElement>(null);

	const dispatch = useAppDispatch();

	function deleteCard() {
		dispatch(removeCard({ id, listId, text }));
	}

	function updateText() {
		if (
			textEl.current === null ||
			textEl.current.textContent === null ||
			textEl.current.textContent === ""
		)
			return;
		const updatedCard: ICard = {
			id,
			listId,
			text: textEl.current.textContent,
		};

		dispatch(updateCardText(updatedCard));
		dispatch(setOverlay(false));
	}

	useEffect(() => {
		if (!overlayIsActive) {
			setpopUpIsActive(false);
		}
		if (textEl.current) {
			textEl.current.textContent = text;
		}
	}, [overlayIsActive]);

	return (
		<div className="relative">
			<section
				className={
					popUpIsActive
						? "bg-neutral-50 rounded py-2 px-1 flex flex-col group relative break-all z-30"
						: "bg-neutral-50 rounded py-2 px-1 flex group relative break-all"
				}
			>
				{overlayIsActive && popUpIsActive && (
					<div className="flex flex-col left-72 top-0 absolute z-30 rounded bg-opacity-95 space-y-1 break-normal">
						<button className="py-1 px-2 text-gray-100 bg-gray-800 rounded">
							Edit
						</button>
						<button
							onClick={() => {
								deleteCard();
							}}
							className="py-1 px-2 text-gray-100 bg-gray-800 rounded"
						>
							Delete
						</button>
						<button className="py-1 px-2 text-gray-100 bg-gray-800 rounded">
							Edit
						</button>
					</div>
				)}
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
					{text}
				</p>
				{!popUpIsActive && (
					<button
						className="absolute right-1 top-1 w-7 h-7 p-1.5 hover:bg-gray-200 rounded hidden group-hover:block"
						onClick={() => {
							setpopUpIsActive(true);
							dispatch(setOverlay(true));
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
