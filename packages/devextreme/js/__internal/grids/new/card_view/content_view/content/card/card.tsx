/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import $ from '@js/core/renderer';
import type { DataRow } from '@ts/grids/new/grid_core/columns_controller/types';
import { PureComponent } from '@ts/grids/new/grid_core/core/pure_component';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type ComponentType, type InfernoNode, render } from 'inferno';

import type { CoverProps } from './cover';
import { Cover } from './cover';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { FieldProps } from './field';
import { Field } from './field';
import type { CardHeaderItem } from './header';
import { CardHeader } from './header';

export const CLASSES = {
  card: 'dx-cardview-card',
};

export interface CardProps {
  row: DataRow;

  toolbar?: CardHeaderItem[];

  cover?: CoverProps;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fieldTemplate?: any;
}

export class Card extends PureComponent<CardProps> {
  render(): InfernoNode {
    const FieldTemplate = this.props.fieldTemplate ?? Field;
    return (
      <div className={CLASSES.card} tabIndex={0}>
        <CardHeader
          items={this.props.toolbar || []}
        />
        {this.props.cover?.src && (
          <Cover
            src={this.props.cover.src}
            alt={this.props.cover.alt}
            className={this.props.cover.className}
          />
        )}
        {this.props.row.cells.map((cell, index) => (
          <FieldTemplate
            index={index}
            // eslint-disable-next-line max-len, @typescript-eslint/explicit-function-return-type
            defaultTemplate={{ render(model, _index, container) { render(<Field {...model} />, $(container).get(0)); } }}
            alignment={cell.column.alignment}
            title={cell.column.caption || cell.column.name}
            value={cell.value}
          />
        ))}
      </div>
    );
  }
}
