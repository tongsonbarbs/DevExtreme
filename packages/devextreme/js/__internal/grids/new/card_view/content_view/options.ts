export interface Options {
  cardsPerRow?: number | 'auto';
  cardMinWidth?: number;
  cardMaxWidth?: number;
}

export const defaultOptions = {
  cardsPerRow: 3,
} satisfies Options;
