/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { PureComponent } from '@ts/grids/new/grid_core/core/pure_component';
import type { InfernoNode } from 'inferno';

const CLASSES = {
  cover: 'dx-card-cover',
  image: 'dx-card-cover-image',
};

export interface CoverProps {
  src: string;
  alt?: string;
  className?: string;
}

export class Cover extends PureComponent<CoverProps> {
  render(): InfernoNode {
    const coverClasses = `${CLASSES.image} ${this.props.className || ''}`.trim();
    return (
      <div className={CLASSES.cover}>
        <img
          src={this.props.src}
          alt={this.props.alt ?? 'Devexpress'}
          className={coverClasses}
          // TODO: move to scss
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
    );
  }
}
