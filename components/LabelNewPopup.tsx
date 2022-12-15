import { useRef, useState, Dispatch, SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";

import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { addLabel } from "../slices/listsSlices";

import { ICard, ILabel, labelColor, labelColors } from "../types";
import CloseIcon from "../icons/close.svg";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

function LabelNewPopup(
	props: ICard & { setlabelNewPopupIsActive: Dispatch<SetStateAction<boolean>> }
) {
	const dispatch = useAppDispatch();

	const [selectedColor, setselectedColor] = useState<labelColor>("blue");

	const labelNameRef = useRef<HTMLInputElement>(null);

	function saveLabel() {
		if (!labelNameRef.current || labelNameRef.current.value === "") return;

		const newLabel: ILabel = {
			id: uuidv4(),
			listId: props.listId,
			cardId: props.id,
			text: labelNameRef.current.value,
			color: selectedColor,
		};

		dispatch(addLabel(newLabel));
		props.setlabelNewPopupIsActive(false);
	}

	return (
		<div className="absolute bg-stone-100 shadow-2xl border border-gray-300 rounded-lg left-1/2 transform -translate-x-1/2 w-72 h-1/2 top-8 px-4">
			<CloseIcon
				onClick={() => {
					props.setlabelNewPopupIsActive(false);
				}}
				className="w-5 h-5 absolute top-2 right-2 hover:bg-red-400 rounded cursor-pointer"
			/>

			<div className="flex flex-col space-y-1.5 mt-7">
				<label htmlFor="title" className="text-base font-medium">
					Title
				</label>
				<input
					ref={labelNameRef}
					className="rounded-md py-1.5 px-2 outline-none shadow-2xl border border-stone-200"
					id="title"
					type="text"
				/>
			</div>
			<div className="flex flex-col mt-5">
				<label htmlFor="color-picker" className="text-base font-medium">
					Select a color
				</label>
				<div id="color-picker" className="flex flex-wrap items-center">
					{Object.keys(labelColors).map((color) => (
						<div key={color}>
							<div
								onClick={(e) => {
									setselectedColor(e.currentTarget.id as labelColor);
								}}
								id={color}
								className="p-4 m-0.5 rounded-full"
								style={{
									backgroundColor:
										labelColors[color as keyof typeof labelColors],
									border: selectedColor === color ? "2px solid black" : "none",
								}}
							></div>
						</div>
					))}
				</div>

				<button
					onClick={() => {
						saveLabel();
					}}
					className="absolute bottom-3 right-3 text-lg text-zinc-100 px-3 py-0.5 bg-blue-500 hover:bg-blue-600 rounded-full"
				>
					Save
				</button>
			</div>
		</div>
	);
}

export default LabelNewPopup;
