export interface ICard {
	id: string;
	listId: string;
	text: string;
}

export interface IList {
	name: string;
	id: string;
	cards: ICard[];
}
