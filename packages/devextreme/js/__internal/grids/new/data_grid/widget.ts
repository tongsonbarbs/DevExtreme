/* eslint-disable spellcheck/spell-checker */
import registerComponent from '@js/core/component_registrator';
// import { MainView as MainViewBase } from '@ts/grids/new/grid_core/main_view';
import { OptionsController as OptionsControllerBase } from '@ts/grids/new/grid_core/options_controller/options_controller';
import { GridCoreNewBase } from '@ts/grids/new/grid_core/widget';

// import { MainView } from './main_view';
import { OptionsController } from './options_controller';
import type { Options } from './types';

class DataGridNew extends GridCoreNewBase<Options> {
  protected _registerDIContext(): void {
    super._registerDIContext();
    // this.diContext.register(MainViewBase, MainView);

    const optionsController = new OptionsController(this);
    this.diContext.registerInstance(OptionsController, optionsController);
    this.diContext.registerInstance(OptionsControllerBase, optionsController);
  }
}

// @ts-expect-error
registerComponent('dxDataGridNew', DataGridNew);

export default DataGridNew;
