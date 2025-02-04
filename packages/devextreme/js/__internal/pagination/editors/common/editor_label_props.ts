import { themeReadyCallback } from '@js/ui/themes_callback';

import { current, isMaterial } from '../../../../ui/themes';

export interface EditorLabelProps {
  label?: string;
  labelMode?: 'static' | 'floating' | 'hidden';
}

export const EditorLabelDefaultProps: EditorLabelProps = {
  label: '',
  labelMode: 'static',
};

themeReadyCallback.add(() => {
  EditorLabelDefaultProps.labelMode = isMaterial(current() || 'generic.light') ? 'floating' : 'static';
});
