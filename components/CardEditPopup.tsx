import CloseIcon from "../icons/close.svg";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { unsetCard, selectCard } from "../slices/cardSlice";
import PlusIcon from "../icons/plus.svg";

import LabelNewPopup from "./LabelNewPopup";
import { useEffect, useState } from "react";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

function CardPopup() {
	const dispatch = useAppDispatch();
	let card = useAppSelector(selectCard);

	const [labelNewPopupIsActive, setlabelNewPopupIsActive] = useState(false);

	useEffect(() => {
		console.log(card);
	});

	return (
		<div className="w-screen h-screen fixed z-40">
			<div className="absolute px-4 flex flex-col bg-gray-50 w-2/3 h-5/6 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-sm z-40">
				<CloseIcon
					onClick={() => {
						dispatch(unsetCard());
					}}
					className="w-7 h-7 absolute top-2 right-2 hover:bg-red-400 rounded cursor-pointer"
				/>

				{card && labelNewPopupIsActive && (
					<LabelNewPopup
						listId={card.listId}
						id={card.id}
						labels={card.labels}
						text={card.text}
						setlabelNewPopupIsActive={setlabelNewPopupIsActive}
					/>
				)}

				<h1 className="mt-5 text-2xl">Edit card</h1>

				<div className="mt-9 flex flex-col space-y-2">
					<h2 className="text-base">Labels</h2>
					<div className="flex flex-wrap items-center">
						{card?.labels.map((label) => (
							<div
								key={label.id}
								className="bg-green-500 rounded-lg text-xs text-white px-2 py-1 m-0.5"
							>
								{label.text}
							</div>
						))}
						<button className="px-1 py-0.5 bg-gray-200 hover:bg-gray-300 rounded-lg m-0.5 ml-1 flex space-x-0.5 items-center">
							<PlusIcon
								onClick={() => {
									setlabelNewPopupIsActive(true);
								}}
								className="w-5 h-5 stroke-2"
							/>
						</button>
					</div>
				</div>

				<div className="mt-12 flex flex-col space-y-2">
					<h2 className="text-base">Description</h2>
					<textarea className="h-64 p-2 rounded-sm border border-gray-200 resize-none focus:outline-none">
						{card?.text}
					</textarea>
				</div>

				<div className="absolute left-1/2 transform -translate-x-1/2 top-4  bg-emerald-300 w-1/2 h-3/12"></div>

				<button className="text-lg text-zinc-100 p-6 py-1 bg-blue-500 hover:bg-blue-600 rounded w-fit self-end mt-6 mr-3">
					Save
				</button>
			</div>
		</div>
	);
}

export default CardPopup;
