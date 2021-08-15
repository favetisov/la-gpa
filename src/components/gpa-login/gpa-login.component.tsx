import { Component, Host, h } from '@stencil/core';
import { userState } from '@src/stores/user.store';
import { Storage } from '@capacitor/storage';
import { getRouter } from '@src/tools/get-router';
import { environment } from '@src/environments/environment';
import dayjs from 'dayjs';
import { UsersService } from '@src/services/users.service';

@Component({
  tag: 'gpa-login',
  styleUrl: 'gpa-login.component.scss',
  shadow: false,
})
export class GpaLogin {
  async login(passPhrase: string) {
    const user = await new UsersService().login(passPhrase);
    for (const key in user) {
      userState[key] = user[key];
    }
    await Storage.set({
      key: 'gpa::user-token',
      value: userState.token,
    });

    return getRouter().back();
  }

  render() {
    return (
      <Host>
        <div class="login-wrapper">
          <h1>LizaAlert</h1>
          <h2>Группа просмотра и анализа</h2>
          <div class="login-buttons">
            <div class="login-as">Войти как:</div>
            <ion-button onClick={() => this.login('junior')} color="secondary">
              Младший
            </ion-button>
            <ion-button onClick={() => this.login('senior')} color="secondary">
              Старший
            </ion-button>
          </div>
          <div class="version">
            Версия: {environment.version}. Последнее обновление: {dayjs(environment.updatedTimestamp).format('DD.MM.YYYY')}
          </div>
        </div>
      </Host>
    );
  }
}
