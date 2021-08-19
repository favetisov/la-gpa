import { Component, h, State, Element, Prop } from '@stencil/core';
import CloseIcon from '../../assets/icon/close.svg';

const POINT_RADIUS = 4;

@Component({
  tag: 'gpa-viewer-ruler',
  styleUrl: 'gpa-viewer-ruler.component.scss',
  shadow: false,
})
export class GpaViewerRuler {
  @Prop() enabled: boolean;
  @State() points = [];
  @State() grabbedPointIdx: number;
  @State() dragStepCoordinates: { x: number; y: number };
  @State() totalLengthPx: number = 0;
  @State() confirmDeletePoints: boolean = false;
  @Element() element: HTMLGpaViewerRulerElement;
  pxToCm = 2;

  onMouseDown({ x, y }) {
    if (this.grabbedPointIdx === undefined) {
      const pIdx = this.findPointIdxByCoordinates(x, y);
      if (pIdx !== -1) {
        this.grabbedPointIdx = pIdx;
        this.dragStepCoordinates = { x, y };
      } else {
        this.points = [...this.points, { x, y }];
        this.reCalculateLength();
      }
    }
  }

  onMouseUp() {
    if (this.grabbedPointIdx !== undefined) {
      this.grabbedPointIdx = undefined;
    }
  }

  onMouseMove({ x, y }) {
    if (this.grabbedPointIdx !== undefined) {
      const diffX = this.dragStepCoordinates.x - x;
      const diffY = this.dragStepCoordinates.y - y;
      const p = this.points[this.grabbedPointIdx];
      this.points.splice(this.grabbedPointIdx, 1, { x: p.x - diffX, y: p.y - diffY });
      this.points = [...this.points];
      this.dragStepCoordinates = { x, y };
      this.reCalculateLength();
    } else {
      if (this.findPointIdxByCoordinates(x, y) !== -1) {
        this.element.style.cursor = 'pointer';
      } else {
        this.element.style.cursor = 'default';
      }
    }
  }

  onDblClick({ x, y }) {
    const pIdx = this.findPointIdxByCoordinates(x, y);
    if (pIdx !== -1) {
      this.points.splice(pIdx, 1);
      this.points = [...this.points];
    }
  }

  private findPointIdxByCoordinates(x, y) {
    return this.points.findIndex(({ x: pX, y: pY }) => Math.abs(x - pX) < POINT_RADIUS && Math.abs(y - pY) < POINT_RADIUS);
  }

  private reCalculateLength() {
    let total = 0;
    for (let i = 0; i < this.points.length - 1; i++) {
      const diffX = Math.abs(this.points[i].x - this.points[i + 1].x);
      const diffY = Math.abs(this.points[i].y - this.points[i + 1].y);
      total += Math.sqrt(diffX * diffX + diffY * diffY);
    }
    this.totalLengthPx = total;
  }

  render() {
    return [
      <svg
        class="measures"
        style={{ 'pointer-events': this.enabled ? 'all' : 'none' }}
        onMouseDown={e => this.onMouseDown(e)}
        onMouseMove={e => this.onMouseMove(e)}
        onMouseUp={() => this.onMouseUp()}
        onDblClick={e => this.onDblClick(e)}
      >
        {this.points.slice(1).map((_, idx) => this.drawLineToPoint(idx + 1))}
        {this.points.map(({ x, y }) => this.drawPointCircle(x, y))}
      </svg>,
      this.points.length > 1 ? this.drawLengthPlate() : null,
    ];
  }

  drawPointCircle(x: number, y: number) {
    return <circle cx={x} cy={y} r={POINT_RADIUS} />;
  }

  drawLineToPoint(destinationPointIdx: number) {
    const prevPoint = this.points[destinationPointIdx - 1];
    const currPoint = this.points[destinationPointIdx];
    return <line x1={prevPoint.x} y1={prevPoint.y} x2={currPoint.x} y2={currPoint.y} stroke-width={3} />;
  }

  drawLengthPlate() {
    const lastP = this.points[this.points.length - 1];
    const lengthCm = this.totalLengthPx * this.pxToCm;

    const format = () => {
      if (lengthCm < 100) {
        return Math.round(lengthCm) + ' см';
      } else if (lengthCm < 1000) {
        return Math.round(lengthCm) / 100 + ' м';
      } else {
        return Math.round(lengthCm / 100) + ' м';
      }
    };

    const deletePoints = () => {
      this.points = [];
      this.confirmDeletePoints = false;
      this.grabbedPointIdx = undefined;
      this.dragStepCoordinates = undefined;
    };

    return (
      <div class="length-plate" style={{ left: lastP.x + 'px', top: lastP.y + 'px' }}>
        {format()}
        <button onClick={() => (this.confirmDeletePoints = true)}>
          <gpa-icon svg={CloseIcon} />
        </button>
        <div class={'confirm-panel ' + (this.confirmDeletePoints ? 'visible' : '')}>
          <h1>Удалить все точки?</h1>
          <p>Чтобы удалить только одну точку, нажмите на неё дважды</p>
          <div class="buttons">
            <ion-button fill="outline" onClick={() => (this.confirmDeletePoints = false)}>
              отмена
            </ion-button>
            <ion-button onClick={() => deletePoints()}>удалить</ion-button>
          </div>
        </div>
      </div>
    );
  }
}
