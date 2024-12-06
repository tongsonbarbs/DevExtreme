/* eslint-disable spellcheck/spell-checker */
import type { Subscribable } from '@ts/core/reactive/index';
import { combined, computed } from '@ts/core/reactive/index';

import { View } from './core/view';
import { DataController } from './data_controller/index';
import type { PagerProps } from './inferno_wrappers/pager';
import { Pager } from './inferno_wrappers/pager';

export class PagerView extends View<PagerProps> {
  protected override component = Pager;

  public static dependencies = [DataController] as const;

  constructor(
    private readonly dataController: DataController,
  ) {
    super();
  }

  protected override getProps(): Subscribable<PagerProps> {
    return combined({
      pageIndex: computed(
        // TODO: fix the '??'
        (pageIndex) => (pageIndex ?? 0) + 1,
        [this.dataController.pageIndex],
      ),
      pageIndexChanged: (value): void => this.dataController.pageIndex.update(value - 1),
      pageSize: this.dataController.pageSize,
      pageSizeChanged: this.dataController.pageSize.update,
      gridCompatibility: false,
      pageCount: this.dataController.pageCount,
      _skipValidation: true,
    });
  }
}
