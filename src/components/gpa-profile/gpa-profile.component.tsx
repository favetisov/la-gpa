import { Component, h } from '@stencil/core';
import { userState } from '@src/stores/user.store';
import { Storage } from '@capacitor/storage';
@Component({
  tag: 'gpa-profile',
  styleUrl: 'gpa-profile.component.scss',
  shadow: false,
})
export class GpaProfile {
  async logout() {
    userState.id = undefined;
    return Storage.remove({
      key: 'gpa::user-token',
    });
  }

  render() {
    return [<gpa-header>Профиль</gpa-header>, <gpa-breadcrumbs crumbs={[{ href: location.href, render: () => 'Профиль пользователя' }]} />, this.renderContent()];
  }

  renderContent() {
    return (
      <ion-content>
        <gpa-card>
          <h1>{userState.name}</h1>
          <section>
            <p>Какая-то информация о пользователе (статистика выполненных заданий, уровни доступа, контактная информация)</p>
          </section>
          <section>
            <ion-button color="secondary" onClick={() => this.logout()}>
              Выйти
            </ion-button>
          </section>
        </gpa-card>
      </ion-content>
    );
  }
}
