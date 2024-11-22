/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable spellcheck/spell-checker */
import type dxScrollable from '@js/ui/scroll_view/ui.scrollable';
import { combined, computed } from '@ts/core/reactive/index';
import { OptionsController } from '@ts/grids/new/card_view/options_controller';
import { ColumnsController } from '@ts/grids/new/grid_core/columns_controller/columns_controller';
import type { Column } from '@ts/grids/new/grid_core/columns_controller/types';
import { View } from '@ts/grids/new/grid_core/core/view4';
import { DataController } from '@ts/grids/new/grid_core/data_controller';
import { ErrorController } from '@ts/grids/new/grid_core/error_controller/error_controller';
import { createRef } from 'inferno';

import type { ContentViewProps } from './content_view';
import { ContentView as ContentViewComponent } from './content_view';

export class ContentView extends View<ContentViewProps> {
  private readonly isNoData = computed(
    (isLoading, items) => !isLoading && items.length === 0,
    [this.dataController.isLoading, this.dataController.items],
  );

  private readonly items = computed(
    (dataItems, columns: Column[]) => dataItems.map(
      (item) => this.columnsController.createDataRow(
        item,
        columns,
      ),
    ),
    [this.dataController.items, this.columnsController.visibleColumns],
  );

  public readonly scrollableRef = createRef<dxScrollable>();

  protected override component = ContentViewComponent;

  public static dependencies = [
    DataController, OptionsController, ErrorController, ColumnsController,
  ] as const;

  constructor(
    protected readonly dataController: DataController,
    protected readonly options: OptionsController,
    protected readonly errorController: ErrorController,
    protected readonly columnsController: ColumnsController,

  ) {
    super();
  }

  protected override getProps() {
    return combined({
      loadPanelProps: combined({
        visible: this.dataController.isLoading,
      }),
      noDataTextProps: combined({
        text: this.options.oneWay('noDataText'),
        visible: this.isNoData,
      }),
      errorRowProps: combined({
        errors: this.errorController.errors,
      }),
      items: this.items,
      fieldTemplate: this.options.template('fieldTemplate'),
      cardsPerRow: this.options.oneWay('cardsPerRow'),
    });
  }
}
