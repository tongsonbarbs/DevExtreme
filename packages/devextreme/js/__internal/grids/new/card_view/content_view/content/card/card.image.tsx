import { PureComponent } from '@ts/grids/new/grid_core/core/pure_component';
import type { InfernoNode } from 'inferno';

const CLASSES = {
  cover: 'dx-card-cover',
};

export interface ImageProps {
  src?: string;
  alt?: string;
  style?: React.CSSProperties;
}

export class Image extends PureComponent<ImageProps> {
  render(): InfernoNode {
    if (!this.props.src) {
      return null;
    }
    return (
      <div className={CLASSES.cover}>
        <img
          src={this.props.src}
          alt={this.props.alt ?? 'Image'}
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
    );
  }
}
