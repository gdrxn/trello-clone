import { ILabel, labelColors } from "../types";

function Label(
	props: ILabel & { showLabelText: boolean; onClick: () => void }
) {
	return (
		<div
			onClick={() => {
				props.onClick();
			}}
			className="rounded-lg text-xs text-white w-8 min-w-fit px-2 py-1 m-0.5"
			style={{ backgroundColor: labelColors[props.color] }}
		>
			{props.showLabelText && props.text}
		</div>
	);
}

export default Label;
