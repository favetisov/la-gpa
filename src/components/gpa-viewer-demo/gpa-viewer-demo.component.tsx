import { Component, Host, h, Element, State } from '@stencil/core';
import CompassIcon from '../../assets/icon/compass.svg';
import BrightnessIcon from '../../assets/icon/brightness.svg';
import ContrastIcon from '../../assets/icon/contrast.svg';
import SaturationIcon from '../../assets/icon/saturation.svg';
import RulerIcon from '../../assets/icon/ruler.svg';

@Component({
  tag: 'gpa-viewer-demo',
  styleUrl: 'gpa-viewer-demo.component.scss',
  shadow: false,
})
export class GpaViewerDemo {
  @Element() element: HTMLGpaViewerDemoElement;
  @State() showBrightnessPanel: boolean = false;
  @State() rulerMode: boolean = false;
  @State() brightness: number = 100;
  @State() contrast: number = 100;
  @State() saturation: number = 100;
  @State() measurePoints: Array<{ x: number; y: number }> = [];

  goFullscreen() {
    // if (this.element.requestFullscreen) {
    //   this.element.requestFullscreen();
    // }
  }

  processImageClick(e) {
    if (this.rulerMode) {
      // const { offsetX: x, offsetY: y } = e;
      const { x, y } = e;
      this.measurePoints = [...this.measurePoints, { x, y }];
      console.log(this.measurePoints);
    }
  }

  render() {
    return (
      <Host onClick={() => this.goFullscreen()}>
        <div class="viewer">
          <ion-fab class="compass" color="primary">
            <ion-fab-button>
              <gpa-icon svg={CompassIcon} />
            </ion-fab-button>
          </ion-fab>
          <ion-fab class="contrast" color="primary" onClick={() => (this.showBrightnessPanel = !this.showBrightnessPanel)}>
            <ion-fab-button>
              <gpa-icon svg={BrightnessIcon} class={this.showBrightnessPanel ? 'active' : ''} />
            </ion-fab-button>
          </ion-fab>

          <ion-fab class="ruler" color="primary" onClick={() => (this.rulerMode = !this.rulerMode)}>
            <ion-fab-button>
              <gpa-icon svg={RulerIcon} class={this.rulerMode ? 'active' : ''} />
            </ion-fab-button>
          </ion-fab>
          <div
            class={'contrast-panel ' + (this.showBrightnessPanel ? ' displayed' : '')}
            // onMouseLeave={() => (this.showBrightnessPanel = false)}
          >
            <ion-range min={20} max={200} value={100} color="secondary" onIonChange={(e: any) => (this.brightness = e.detail.value)}>
              <gpa-icon svg={BrightnessIcon} slot="start" />
            </ion-range>
            <ion-range min={20} max={200} value={100} color="secondary" onIonChange={(e: any) => (this.contrast = e.detail.value)}>
              <gpa-icon svg={ContrastIcon} slot="start" class="contrast-icon" />
            </ion-range>
            <ion-range min={20} max={200} value={100} color="secondary" onIonChange={(e: any) => (this.saturation = e.detail.value)}>
              <gpa-icon svg={SaturationIcon} slot="start" class="contrast-icon" />
            </ion-range>
            <ion-button color="secondary" fill="outline">
              применить ко всем кадрам
            </ion-button>
          </div>

          <img
            onClick={e => this.processImageClick(e)}
            src="https://storage.yandexcloud.net/bpla-photo-out/ID073/21_ID073_00021_bcdb1d35.JPG"
            style={{
              filter: `brightness(${this.brightness / 100}) contrast(${this.contrast / 100})  saturate(${this.saturation / 100})`,
            }}
          />
          {this.renderMeasurements()}
        </div>
      </Host>
    );
  }

  renderMeasurements() {
    const drawLineToPoint = (idx: number) => {
      const prevPoint = this.measurePoints[idx - 1];
      const currPoint = this.measurePoints[idx];
      return <line x1={prevPoint.x} y1={prevPoint.y} x2={currPoint.x} y2={currPoint.y} stroke="black" stroke-width={3} />;
    };

    return (
      <svg class="measures">
        {this.measurePoints.slice(1).map((_, idx) => drawLineToPoint(idx + 1))}
        {this.measurePoints.map(({ x, y }) => [
          <circle style={{ fill: 'black', cursor: 'pointer' }} cx={x} cy={y} r={8} />,
          <circle style={{ fill: '#ECEAEC' }} cx={x} cy={y} r={6} />,
        ])}
      </svg>
    );
  }
}
