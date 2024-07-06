import registerComponent from '@js/core/component_registrator';
import $ from '@js/core/renderer';
import browser from '@js/core/utils/browser';
import type { Properties } from '@js/ui/card_view';
import { isMaterialBased } from '@js/ui/themes';
import Widget from '@js/ui/widget/ui.widget';
import { DIContext } from '@ts/core/di';

import { ColumnsController } from './columns_controller/columns_controller';
import { ContentView } from './content_view/content_view';
import { DataController } from './data_controller/data_controller';
import { EditingController } from './editing/controller';
// import { HeaderPanelController } from './header_panel/controller';
// import { HeaderPanelView } from './header_panel/view';
import { OptionsController } from './options_controller/options_controller';

class CardView extends Widget<Properties> {
  private readonly diContext = new DIContext();

  constructor(element: Element, options: Properties) {
    super(element, options);

    this.diContext.register(DataController);
    this.diContext.register(ColumnsController);
    // this.diContext.register(HeaderPanelController);
    // this.diContext.register(HeaderPanelView);
    this.diContext.register(EditingController);
    this.diContext.register(ContentView);
    this.diContext.registerInstance(OptionsController, new OptionsController(this));
  }

  private _defaultOptionsRules() {
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return super._defaultOptionsRules().concat([
      {
        device() {
          // @ts-expect-error
          return isMaterialBased();
        },
        options: {
          headerFilter: {
            height: 315,
          },
          editing: {
            useIcons: true,
          },
          selection: {
            showCheckBoxesMode: 'always',
          },
        },
      },
      {
        device() {
          return browser.webkit;
        },
        options: {
          loadingTimeout: 30, // T344031
          loadPanel: {
            animation: {
              show: {
                easing: 'cubic-bezier(1, 0, 1, 0)',
                duration: 500,
                from: { opacity: 0 },
                to: { opacity: 1 },
              },
            },
          },
        },
      },
    ]);
  }

  protected _initMarkup() {
    // @ts-expect-error
    super._initMarkup.apply(this, arguments);

    const $contentView = $('<div>').appendTo(this.$element());
    this.diContext.get(ContentView).render($contentView.get(0));
  }
}

// @ts-expect-error
registerComponent('dxCardView', CardView);

export default CardView;
