import { Component, h } from '@stencil/core';
import { userState } from '@src/stores/user.store';
import { routes } from '@src/tools/routes';
import UserIcon from '../../assets/icon/user.svg';

@Component({
  tag: 'gpa-header',
  styleUrl: 'gpa-header.component.scss',
  shadow: false,
})
export class GpaHeader {
  render() {
    return (
      <ion-header>
        <ion-toolbar color="secondary">
          <ion-buttons slot="start">
            <ion-back-button></ion-back-button>
          </ion-buttons>
          <ion-title>
            <slot />
          </ion-title>
          <ion-buttons slot="end">
            <ion-button href={routes.profile} class="user-button">
              <div class="user-name">{userState.name}</div>
              <gpa-icon svg={UserIcon} />
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
    );
  }
}
