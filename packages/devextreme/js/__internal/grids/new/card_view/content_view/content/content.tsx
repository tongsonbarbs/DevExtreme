import type { DataRow } from '@ts/grids/new/grid_core/columns_controller/types';
import { PureComponent } from '@ts/grids/new/grid_core/core/pure_component';
import { createRef } from 'inferno';

import { Card } from './card/card';
import type { CardHeaderItem } from './card/header';

export interface SizesInfo {
  cardRowHeight: number;

  cardPerRow: number;
}

export interface ContentProps {
  items: DataRow[];

  toolbar?: CardHeaderItem[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fieldTemplate?: any;

  onSizesInfoChanged?: (info: SizesInfo) => void;
}

export const CLASSES = {
  content: 'dx-cardview-content',
};

export class Content extends PureComponent<ContentProps> {
  private readonly containerRef = createRef<HTMLDivElement>();

  render(): JSX.Element {
    return (
      <div className={CLASSES.content}>
        {this.props.items.map((item) => (
          <Card
            row={item}
            fieldTemplate={this.props.fieldTemplate}
            toolbar={this.props.toolbar}
          />
        ))}
      </div>
    );
  }

  componentDidMount(): void {

  }
}
