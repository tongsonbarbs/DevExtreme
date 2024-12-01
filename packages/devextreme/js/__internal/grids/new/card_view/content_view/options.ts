import type { ScrollingBase } from '@js/common/grids';

export interface Options {
  cardsPerRow?: number | 'auto';
  cardMinWidth?: number;
  cardMaxWidth?: number;

  scrolling?: Pick<ScrollingBase, 'scrollByContent' | 'scrollByThumb' | 'showScrollbar' | 'useNative'>;
}

export const defaultOptions = {
  cardsPerRow: 3,
} satisfies Options;
