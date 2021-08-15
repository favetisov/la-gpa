import { Component, h, State } from '@stencil/core';
import { Storage } from '@capacitor/storage';
import { onUserStateChange, userState } from '@src/stores/user.store';
import { routes } from '@src/tools/routes';
import { UsersService } from '@src/services/users.service';

@Component({
  tag: 'gpa-root',
  styleUrl: 'gpa-root.component.scss',
  shadow: false,
})
export class GpaRoot {
  @State() userId;

  async componentWillLoad() {
    const { value: userToken } = await Storage.get({ key: 'gpa::user-token' });
    onUserStateChange('id', id => {
      this.userId = id;
    });
    if (userToken) {
      userState.token = userToken;
      const user = await new UsersService().loadProfile();
      if (user) {
        for (const key in user) {
          userState[key] = user[key];
        }
      }
    }
  }

  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>
          <ion-route url={routes.login} component="gpa-login" />
          {this.userId ? <ion-route-redirect from={routes.login} to={routes.quests} /> : <ion-route-redirect from="*" to={routes.login} />}
          <ion-route url={routes.quests} component="gpa-quests" />
          <ion-route url={routes.quest} component="gpa-quest" />
          <ion-route url={routes.profile} component="gpa-profile" />
          <ion-route url={routes.task} component="gpa-task" />
        </ion-router>
        <ion-nav animated={false} />
      </ion-app>
    );
  }
}
