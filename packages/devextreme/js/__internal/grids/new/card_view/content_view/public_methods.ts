/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable spellcheck/spell-checker */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type dxScrollable from '@js/ui/scroll_view/ui.scrollable';
import type { Constructor } from '@ts/grids/new/grid_core/types';

import type { CardViewBase } from '../widget';
import { ContentView } from './view';

export function PublicMethods<T extends Constructor<CardViewBase>>(GridCore: T) {
  return class CardViewWithContentView extends GridCore {
    public getScrollable(): dxScrollable {
      return this.diContext.get(ContentView).scrollableRef.current!;
    }
  };
}
