/* eslint-disable spellcheck/spell-checker */
import type { SubsGets } from '@ts/core/reactive/index';
import { computed, state } from '@ts/core/reactive/index';

import { ColumnsController } from '../columns_controller/columns_controller';
import { View } from '../core/view4';
import { ToolbarController } from '../toolbar/controller';
import type { ColumnChooserProps } from './column_chooser';
import { ColumnChooser } from './column_chooser';

export class ColumnsChooserView extends View<ColumnChooserProps> {
  protected override component = ColumnChooser;

  private readonly visible = state(false);

  private readonly items = computed(
    (columns) => columns.map((c) => ({
      text: c.name,
    })),
    [this.columns.nonVisibleColumns],
  );

  public static dependencies = [ToolbarController, ColumnsController] as const;

  constructor(
    private readonly headerPanel: ToolbarController,
    private readonly columns: ColumnsController,
  ) {
    super();
    this.headerPanel.addDefaultItem({
      name: 'columnsChooserButton',
      widget: 'dxButton',
      options: {
        icon: 'column-chooser',
        onClick: () => { this.visible.updateFunc((value) => !value); },
        elementAttr: { 'aria-haspopup': 'dialog' },
      },
      showText: 'inMenu',
      location: 'after',
      locateInMenu: 'auto',
    });
  }

  protected override getProps(): SubsGets<ColumnChooserProps> {
    return computed(
      (visible, items) => ({ visible, items }),
      [this.visible, this.items],
    );
  }
}
