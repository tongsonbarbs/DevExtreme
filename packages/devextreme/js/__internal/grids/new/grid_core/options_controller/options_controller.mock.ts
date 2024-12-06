import type { defaultOptions, Options } from '../options';
import { OptionsControllerMock as OptionsControllerBaseMock } from './options_controller_base.mock';

export class OptionsControllerMock extends OptionsControllerBaseMock<
Options, typeof defaultOptions
> {}
