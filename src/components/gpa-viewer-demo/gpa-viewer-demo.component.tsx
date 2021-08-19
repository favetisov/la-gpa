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

  goFullscreen() {
    // if (this.element.requestFullscreen) {
    //   this.element.requestFullscreen();
    // }
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
          <div class={'contrast-panel ' + (this.showBrightnessPanel ? ' displayed' : '')}>
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
            src="https://storage.yandexcloud.net/bpla-photo-out/ID073/21_ID073_00021_bcdb1d35.JPG"
            style={{
              filter: `brightness(${this.brightness / 100}) contrast(${this.contrast / 100})  saturate(${this.saturation / 100})`,
            }}
          />
          <gpa-viewer-ruler enabled={this.rulerMode} />
        </div>
      </Host>
    );
  }
}
