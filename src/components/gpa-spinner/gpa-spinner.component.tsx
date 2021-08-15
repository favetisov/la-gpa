import { Component, Host, h } from '@stencil/core';
@Component({
  tag: 'gpa-spinner',
  styleUrl: 'gpa-spinner.component.scss',
  shadow: false,
})
export class GpaSpinner {
  render() {
    return (
      <Host>
        <div class="spinner">
          <div class="bounce"></div>
          <div class="bounce"></div>
          <div class="bounce 3"></div>
        </div>
      </Host>
    );
  }
}
