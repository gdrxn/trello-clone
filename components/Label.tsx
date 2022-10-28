import React, { useState } from "react";

function Label() {
	const [showLabelText, setshowLabelText] = useState(false);

	function toggleLabelText() {
		setshowLabelText((current) => !current);
	}

	return (
		<div
			onClick={() => {
				toggleLabelText();
			}}
			className="bg-green-500 rounded-lg text-xs text-white w-8 min-w-fit px-2 py-1 m-0.5"
		>
			{showLabelText && 123456}
		</div>
	);
}

export default Label;
