/* eslint-disable @typescript-eslint/ban-types */
import type { Options } from '../options';
import { OptionsController as OptionsControllerBase } from './options_controller_base';

class GridCoreOptionsController extends OptionsControllerBase<Options, {}> {}

export { GridCoreOptionsController as OptionsController };
