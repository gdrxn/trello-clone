import React, { useRef, useState } from "react";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import { editLabel, removeLabel } from "../slices/listsSlices";
import type { RootState, AppDispatch } from "../store";
import { ILabel, labelColor, labelColors } from "../types";
import { Dispatch, SetStateAction } from "react";
import CloseIcon from "../icons/close.svg";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

function LabelNewPopup(
	props: ILabel & {
		setselectedLabel: Dispatch<SetStateAction<null | ILabel>>;
	}
) {
	const dispatch = useAppDispatch();
	const [selectedColor, setselectedColor] = useState<labelColor>(props.color);
	const labelNameRef = useRef<HTMLInputElement>(null);
	const newText = useRef(props.text);

	function saveLabel() {
		if (newText.current === "") return;

		const editedLabel = {
			id: props.id,
			cardId: props.cardId,
			listId: props.listId,
			text: newText.current,
			color: selectedColor,
		};

		dispatch(editLabel(editedLabel));
		props.setselectedLabel(null);
	}

	function deleteLabel() {
		const currentLabel = {
			id: props.id,
			cardId: props.cardId,
			listId: props.listId,
			text: props.text,
			color: props.color,
		};

		dispatch(removeLabel(currentLabel));
		props.setselectedLabel(null);
	}

	return (
		<div className="absolute bg-stone-100 shadow-2xl border border-gray-300 rounded-lg left-1/2 transform -translate-x-1/2 w-72 h-1/2 top-8 px-4">
			<CloseIcon
				onClick={() => {
					props.setselectedLabel(null);
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
					defaultValue={newText.current}
					onChange={(e) => {
						newText.current = e.target.value;
					}}
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

				<div className="flex space-x-1 absolute bottom-3 right-3">
					<button
						onClick={() => {
							deleteLabel();
						}}
						className="text-lg text-zinc-100 px-3 py-0.5 bg-red-500 hover:bg-red-600 rounded-full"
					>
						Delete
					</button>
					<button
						onClick={() => {
							saveLabel();
						}}
						className="text-lg text-zinc-100 px-3 py-0.5 bg-blue-500 hover:bg-blue-600 rounded-full"
					>
						Save
					</button>
				</div>
			</div>
		</div>
	);
}

export default LabelNewPopup;
