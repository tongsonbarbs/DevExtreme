/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import $ from '@js/core/renderer';
import type { DataRow } from '@ts/grids/new/grid_core/columns_controller/types';
import { PureComponent } from '@ts/grids/new/grid_core/core/pure_component';
import { CollectionController } from '@ts/grids/new/grid_core/keyboard_navigation/collection_controller';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { InfernoNode, RefObject } from 'inferno';
import { createRef, render } from 'inferno';

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

  minWidth?: number;

  maxWidth?: number;

  toolbar?: CardHeaderItem[];

  cover?: CoverProps;

  elementRef?: RefObject<HTMLDivElement>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fieldTemplate?: any;
}

export class Card extends PureComponent<CardProps> {
  private containerRef = createRef<HTMLDivElement>();

  private fieldRefs: RefObject<HTMLDivElement>[] = [];

  private readonly keyboardController = new CollectionController();

  render(): InfernoNode {
    if (this.props.elementRef) {
      this.containerRef = this.props.elementRef;
    }

    this.fieldRefs = new Array(this.props.row.cells.length).fill(undefined).map(() => createRef());

    const FieldTemplate = this.props.fieldTemplate ?? Field;
    return (
      <div
        className={CLASSES.card}
        tabIndex={0}
        ref={this.props.elementRef}
        onKeyDown={(e): void => this.keyboardController.onKeyDown(e)}
        // TODO: move to scss
        style={{ 'min-width': `${this.props.minWidth}px`, 'max-width': `${this.props.maxWidth}px` }}
      >
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
            elementRef={this.fieldRefs[index]}
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

  updateKeyboardController(): void {
    this.keyboardController.container = this.containerRef.current!;
    this.keyboardController.items = this.fieldRefs.map((ref) => ref.current!);
  }

  componentDidMount(): void {
    this.updateKeyboardController();
  }

  componentDidUpdate(): void {
    this.updateKeyboardController();
  }
}
