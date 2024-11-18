import type { dxToolbarItem } from '@js/ui/toolbar';
import { PureComponent } from '@ts/grids/new/grid_core/core/pure_component';
import { Button } from '@ts/grids/new/grid_core/inferno_wrappers/button';
import { CheckBox } from '@ts/grids/new/grid_core/inferno_wrappers/checkbox';
import type { InfernoNode } from 'inferno';

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

export class CardHeader extends PureComponent<CardHeaderProps> {
  static defaultProps = {
    items: [] as CardHeaderItem[],
  };

  render(): InfernoNode {
    const renderWidget = (item: CardHeaderItem): InfernoNode => {
      switch (item.widget) {
        case 'dxCheckBox':
          return <CheckBox {...item.options} />;
        case 'dxButton':
          return <Button {...item.options} />;
        default:
          return <span>{item.text}</span>;
      }
    };

    return (
      <div className={CLASSES.cardHeader}>
        {this.props.items.map((item, index) => (
          <div
            // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
            className={`${CLASSES.cardHeaderItem} ${CLASSES.cardHeader}-${item.widget?.toLocaleLowerCase() || 'text'} ${
              item.location === 'before' ? CLASSES.cardHeaderBefore : CLASSES.cardHeaderAfter
            }`}
            key={index}
          >
            {renderWidget(item)}
          </div>
        ))}
      </div>
    );
  }
}
