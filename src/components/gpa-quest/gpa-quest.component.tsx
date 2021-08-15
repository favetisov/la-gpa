import { Component, h, Prop } from '@stencil/core';
import { Quest } from '@src/models/quest.model';
import { QuestsService } from '@src/services/quests.service';
import { environment } from '@src/environments/environment';
import { QuestState } from '@src/models/quest-state.model';
import { userState } from '@src/stores/user.store';
import { RoleLevel } from '@src/models/role-level.model';
import CheckmarkIcon from '../../assets/icon/checked.svg';
import WarningIcon from '../../assets/icon/warning.svg';
import { routes } from '@src/tools/routes';
import { buildRoute } from '@src/tools/build-route';

@Component({
  tag: 'gpa-quest',
  styleUrl: 'gpa-quest.component.scss',
  shadow: false,
})
export class GpaQuest {
  @Prop() questId: number;
  quest: Quest;

  async componentWillLoad() {
    this.quest = await new QuestsService().getQuest(this.questId);
  }

  render() {
    return [
      <gpa-header>{this.quest.title}</gpa-header>,
      <ion-content>
        <gpa-breadcrumbs crumbs={[{ href: location.href, render: () => this.quest.title }]} />
        {this.renderContent()}
      </ion-content>,
    ];
  }

  renderContent() {
    return (
      <div class="workbench">
        <div class="left">
          <gpa-card class="map-card">
            <h1>Схема снимков</h1>
            <img src="/assets/mock/map.jpeg" />
            <div class="pins">
              <div class="dev-description">
                Тут должна быть интерактивная карта всех снимков задания. У каждого снимка id, статус (цветом кружочка) и id задания
                <br />
                <br />
                Режим формирования заданий: кликая на кружочки, раскидываем снимки по заданий
                <br />
                <br />
                М.б. получится использовать API Яндекса?
              </div>

              <div class="pin active" onClick={() => alert('здесь будет смотрелка')} style={{ top: '50%', left: '50%' }}>
                <div class="label">123</div>
              </div>
            </div>
            <div class="legend">
              <div class="item">
                <div class="pin active"></div> - снимок в задаче
              </div>
              <div class="item">
                <div class="pin completed"></div> - просмотренный снимок
              </div>
              <div class="item">
                <div class="pin outside"></div> - снимок не в задаче
              </div>
              <div class="item">
                <div class="pin completed marked"></div> - есть отметки
              </div>
            </div>
          </gpa-card>
          <gpa-card class="photos-card">
            <h1>Все снимки задания</h1>
            <div class="photos">
              {[
                { src: 'https://storage.yandexcloud.net/bpla-photo-out/ID073/21_ID073_00021_bcdb1d35.JPG', id: 123, checked: true },
                { src: 'https://storage.yandexcloud.net/bpla-photo-out/ID073/21_ID073_00021_bcdb1d35.JPG', id: 123 },
                { src: 'https://storage.yandexcloud.net/bpla-photo-out/ID073/21_ID073_00021_bcdb1d35.JPG', id: 123, checked: true, marks: ['something'] },
                { src: 'https://storage.yandexcloud.net/bpla-photo-out/ID073/21_ID073_00021_bcdb1d35.JPG', id: 123 },
                { src: 'https://storage.yandexcloud.net/bpla-photo-out/ID073/21_ID073_00021_bcdb1d35.JPG', id: 123 },
                { src: 'https://storage.yandexcloud.net/bpla-photo-out/ID073/21_ID073_00021_bcdb1d35.JPG', id: 123 },
                { src: 'https://storage.yandexcloud.net/bpla-photo-out/ID073/21_ID073_00021_bcdb1d35.JPG', id: 123 },
                { src: 'https://storage.yandexcloud.net/bpla-photo-out/ID073/21_ID073_00021_bcdb1d35.JPG', id: 123 },
                { src: 'https://storage.yandexcloud.net/bpla-photo-out/ID073/21_ID073_00021_bcdb1d35.JPG', id: 123 },
                { src: 'https://storage.yandexcloud.net/bpla-photo-out/ID073/21_ID073_00021_bcdb1d35.JPG', id: 123 },
                { src: 'https://storage.yandexcloud.net/bpla-photo-out/ID073/21_ID073_00021_bcdb1d35.JPG', id: 123 },
              ].map((p: any) => (
                <div class={'photo ' + (p.checked ? 'checked ' : '') + (p.marks?.length ? 'marked ' : '')}>
                  <img src={p.src} onClick={() => alert('здесь будет смотрелка')} />
                  <div class="label">{p.id}</div>
                </div>
              ))}
            </div>
          </gpa-card>
        </div>
        <div class="right">
          <gpa-card class="status-card">
            <h1>{this.quest.title}</h1>
            <div class="info-row">
              <div class="title">Статус</div>
              <div class="value">{this.quest.state == QuestState.closed ? 'завершено' : 'активно'}</div>
            </div>
            <div class="info-row">
              <div class="title">Пропал</div>
              <div class="value">01.01.1970</div>
            </div>
            <div class="info-row">
              <div class="title">Пролёт</div>
              <div class="value">01.01.1970</div>
            </div>
            <div class="info-row">
              <div class="title">Всего снимков</div>
              <div class="value">583</div>
            </div>
            <div class="info-row">
              <div class="title">Высота</div>
              <div class="value">47м</div>
            </div>
            <div class="info-row">
              <div class="title">Перекрытие</div>
              <div class="value">60%</div>
            </div>
            <div class="extra">Смотрим внимательно деревья в том числе. Возможен суицид</div>
            <div class="buttons">
              {userState.roles.find(level => level == RoleLevel.senior) && <ion-button color="secondary">завершить задачу</ion-button>}
              {userState.roles.find(level => level == RoleLevel.junior) && <ion-button color="secondary">взять задание</ion-button>}
            </div>
          </gpa-card>
          <gpa-card class="tasks-card">
            <h1>Задания</h1>
            {!this.quest.tasks.length && <div class="nothing-found">Задачи ещё не сформированы</div>}
            {this.quest.tasks.map(t => (
              <ion-router-link href={buildRoute(routes.task, { taskId: t.id, questTitle: this.quest.title })} class="task">
                <div class="info-row">
                  <div class="title">
                    #{t.id}
                    {t.marks?.length ? [<gpa-icon svg={WarningIcon} />, <div class="warn">есть отметки</div>] : null}
                    {t.completed && !t.marks.length && <gpa-icon svg={CheckmarkIcon} />}
                  </div>
                  <div class="value">{t.user ? t.user.name : 'не назначена'}</div>
                </div>
              </ion-router-link>
            ))}
          </gpa-card>
          <gpa-card class="photo-card">
            <img src={environment.photoHost + '/quests/' + this.quest.id + '.jpg'} />
          </gpa-card>
        </div>
      </div>
    );
  }
}
