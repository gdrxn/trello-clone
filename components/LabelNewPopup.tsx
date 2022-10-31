import { v4 as uuidv4 } from "uuid";
import React, { useRef, useState } from "react";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import { addLabel } from "../slices/listsSlices";
import type { RootState, AppDispatch } from "../store";
import { ICard, ILabel, labelColor, labelColors } from "../types";
import { Dispatch, SetStateAction } from "react";

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
		<div className="absolute bg-neutral-200 rounded left-1/2 transform -translate-x-1/2 w-1/2 h-1/2 top-8 p-2">
			<div className="flex flex-col space-y-1 mt-1">
				<label htmlFor="title">Title</label>
				<input
					ref={labelNameRef}
					className="rounded-sm py-2 px-1.5 outline-none"
					id="title"
					type="text"
				/>
			</div>

			<div className="flex flex-col mt-4">
				<label htmlFor="color-picker">Select a color</label>
				<div id="color-picker" className="flex flex-wrap items-center">
					{Object.keys(labelColors).map((color) => (
						<div key={color}>
							<div
								onClick={(e) => {
									setselectedColor(e.currentTarget.id as labelColor);
								}}
								id={color}
								className="p-4 m-1 rounded-full"
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
					className="absolute bottom-3 right-3 text-lg text-zinc-100 px-3 py-0.5 bg-blue-500 hover:bg-blue-600 rounded w-fit self-end"
				>
					Save
				</button>
			</div>
		</div>
	);
}

export default LabelNewPopup;
