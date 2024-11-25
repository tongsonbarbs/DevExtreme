import type { dxToolbarItem } from '@js/ui/toolbar';
import { Toolbar } from '@ts/grids/new/grid_core/inferno_wrappers/toolbar';

export const CLASSES = {
  cardHeader: 'dx-cardheader',
  cardHeaderItem: 'dx-cardheader-item',
  cardHeaderBefore: 'dx-cardheader-before',
  cardHeaderAfter: 'dx-cardheader-after',
};

export interface CardHeaderItem {
  location: 'before' | 'after';
  widget?: string;
  text?: string;
  options?: dxToolbarItem;
}

export interface CardHeaderProps {
  items: CardHeaderItem[];
}

export const CardHeader = ({ items }: CardHeaderProps): JSX.Element => (
  <Toolbar items={items} />
);
