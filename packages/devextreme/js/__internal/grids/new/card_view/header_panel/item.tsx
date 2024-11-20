import type { Column } from '@ts/grids/new/grid_core/columns_controller/types';
import type { ComponentType } from 'inferno';

export const CLASSES = {
  item: 'dx-gridcore-header-item',
};

export interface HeaderItemProps {
  column: Column;
  buttons?: ComponentType;
}

export function Item(props: HeaderItemProps): JSX.Element {
  return (
    <div className={CLASSES.item}>
      {props.column.caption}
    </div>
  );
}
