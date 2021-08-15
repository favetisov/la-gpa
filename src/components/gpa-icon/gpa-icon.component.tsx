import { Component, Host, h, Prop } from '@stencil/core';
@Component({
  tag: 'gpa-icon',
  styleUrl: 'gpa-icon.component.scss',
  shadow: false,
})
export class GpaIcon {
  @Prop() svg!: string;

  render() {
    return <Host innerHTML={this.svg}></Host>;
  }
}
