export interface ICard {
	id: string;
	listId: string;
	text: string;
	labels: ILabel[];
}

export interface ILabel {
	id: string;
	cardId: string;
	listId: string;
	text: string;
	color: string;
}

export interface IList {
	name: string;
	id: string;
	cards: ICard[];
}
