import { Component, h, Prop } from '@stencil/core';
import { Task } from '@src/models/task.model';
import { TasksService } from '@src/services/tasks.service';
import { environment } from '@src/environments/environment';
@Component({
  tag: 'gpa-task',
  styleUrl: 'gpa-task.component.scss',
  shadow: false,
})
export class GpaTask {
  @Prop() taskId: number;
  task: Task;

  async componentWillLoad() {
    this.task = new TasksService().getTask(this.taskId);
  }

  render() {
    return [
      <gpa-header>Задание #{this.taskId}</gpa-header>,
      <ion-content>
        <gpa-breadcrumbs crumbs={[{ href: location.href, render: () => this.task.quest.title + ', #' + this.taskId }]} />
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
                Тут должна быть интерактивная карта всех снимков задачи, центрированная на снимках текущего задания.
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
            <h1>Снимки в задаче</h1>
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
            <h1>
              {this.task.quest.title}, #{this.task.id}
            </h1>
            <div class="info-row">
              <div class="title">Статус</div>
              <div class="value">{this.task.completed ? 'завершено' : 'активно'}</div>
            </div>
            <div class="info-row">
              <div class="title">Исполнитель</div>
              <div class="value">{this.task.user?.name || '--'}</div>
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
              <ion-button color="secondary">завершить задание</ion-button>
            </div>
          </gpa-card>
          <gpa-card class="photo-card">
            <img src={environment.photoHost + '/quests/' + this.task.quest.id + '.jpg'} />
          </gpa-card>
        </div>
      </div>
    );
  }
}
