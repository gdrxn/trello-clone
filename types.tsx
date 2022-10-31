export interface ILabel {
	id: string;
	cardId: string;
	listId: string;
	text: string;
	color: labelColor;
}

export type labelColor = "blue" | "green" | "red" | "yellow" | "orange";

export const labelColors = {
	blue: "rgb(59 130 246)",
	green: "rgb(34 197 94)",
	red: "rgb(239 68 68)",
	yellow: "rgb(234 179 8)",
	orange: "rgb(249 115 22)",
};

export interface ICard {
	id: string;
	listId: string;
	text: string;
	labels: ILabel[];
}

export interface IList {
	name: string;
	id: string;
	cards: ICard[];
}
