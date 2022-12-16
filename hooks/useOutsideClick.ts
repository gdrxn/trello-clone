import { Dispatch, SetStateAction, RefObject } from "react";

export default function listenForOutsideClicks(
	listening: boolean,
	setListening: Dispatch<SetStateAction<boolean>>,
	menuRef: RefObject<HTMLElement>,
	setIsOpen: Dispatch<SetStateAction<boolean>>
) {
	return () => {
		if (listening) return;
		if (!menuRef.current) return;
		setListening(true);
		[`click`, `touchstart`].forEach((type) => {
			document.addEventListener(`click`, (evt) => {
				const cur = menuRef.current;
				const node = evt.target;
				if (cur?.contains(node as HTMLElement)) return;

				setIsOpen(false);
			});
		});
	};
}
