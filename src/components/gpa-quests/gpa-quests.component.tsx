import { Component, h, State } from '@stencil/core';
import { Quest } from '@src/models/quest.model';
import { QuestsService } from '@src/services/quests.service';
import { environment } from '@src/environments/environment';
import { routes } from '@src/tools/routes';
import { buildRoute } from '@src/tools/build-route';
import { QuestState } from '@src/models/quest-state.model';
import ChevronIcon from '../../assets/icon/chevron-down.svg';
import { Task } from '@src/models/task.model';
import { userState } from '@src/stores/user.store';
import { filter } from '@src/tools/filter';

@Component({
  tag: 'gpa-quests',
  styleUrl: 'gpa-quests.component.scss',
  shadow: false,
})
export class GpaQuests {
  @State() quests: Quest[];
  @State() assignedTasks: Task[];

  async componentWillLoad() {
    this.quests = await new QuestsService().getQuestsList();
    this.assignedTasks = this.quests.reduce((tasks, quest) => {
      return [...tasks, ...quest.tasks.filter(t => t.user?.id == userState.id).map(t => ({ ...t, ...{ quest } }))];
    }, []);
  }

  canApplyToQuest(q: Quest) {
    return Boolean(q.state == QuestState.active && q.tasks.filter(t => !t.user).length);
  }

  render() {
    return [<gpa-header>Панель управления</gpa-header>, <ion-content>{this.renderContent()}</ion-content>];
  }

  renderContent() {
    let filtersOn = false;
    const filterFn = async (_, query, categories) => {
      let items = this.assignedTasks;
      const state = categories[0].options.find(o => o.selected)?.key;
      if (state == 'active') {
        items = items.filter(t => !t.completed);
      }
      filtersOn = Boolean(query) || state !== 'all';
      return filter(items, query, ['id', 'quest.title']);
    };

    const categories = [
      {
        key: 'state',
        lsKey: 'tasksState',
        placeholder: 'поиск',
        filterFn: (query, options) => options.filter(o => o.text.toLowerCase().includes(query.toLowerCase())),
        renderItem: i => i.text,
        options: [
          { key: 'all', text: 'Все задания' },
          { key: 'active', text: 'Только активные' },
        ],
      },
    ];

    return [
      <gpa-card>
        <h1>Мои задания</h1>
        <section class="tasks">
          <gpa-searchable-content
            items={this.assignedTasks}
            filterFn={filterFn}
            categories={categories}
            placeholder="Поиск по номеру задания или имени человека"
            renderItems={items =>
              !items.length ? (
                <div class="nothing-found">{filtersOn ? 'Ничего не найдено' : 'У вас пока нет заданий. Выберите активную задачу из списка и нажмите "взять задание"'}</div>
              ) : (
                this.renderAssignedTasks(items)
              )
            }
          />
        </section>
      </gpa-card>,
      <gpa-card>
        <h1>Задачи</h1>
        <section>{this.renderQuestsList()}</section>
      </gpa-card>,
    ];
  }

  renderAssignedTasks(tasks: Task[]) {
    return tasks.map(t => (
      <ion-router-link href={buildRoute(routes.task, { taskId: t.id, questTitle: t.quest.title })} class="task">
        <div class="row">
          <div class="info">
            <div class="title">
              {t.quest.title}, #{t.id}
            </div>
            <div class="state">Статус: {t.completed ? 'завершено' : 'активно'}</div>
          </div>
          <div class="action-button">
            <gpa-icon svg={ChevronIcon} />
          </div>
        </div>
      </ion-router-link>
    ));
  }

  renderQuestsList() {
    let filtersOn = false;
    const filterFn = async (_, query, categories) => {
      let items = this.quests;
      const state = categories[0].options.find(o => o.selected)?.key;
      if (state == 'active') {
        items = items.filter(q => q.state == QuestState.active);
      } else if (state == 'available') {
        items = items.filter(q => q.state == QuestState.active && q.tasks.some(t => !t.user));
      }
      filtersOn = Boolean(query) || state !== 'all';
      return filter(items, query, ['title']);
    };

    const categories = [
      {
        key: 'state',
        lsKey: 'questsState',
        placeholder: 'поиск',
        filterFn: (query, options) => options.filter(o => o.text.toLowerCase().includes(query.toLowerCase())),
        renderItem: i => i.text,
        options: [
          { key: 'all', text: 'Все задачи' },
          { key: 'active', text: 'Только активные' },
          { key: 'available', text: 'Доступны задания' },
        ],
      },
    ];
    return (
      <gpa-searchable-content
        items={this.quests}
        filterFn={filterFn}
        categories={categories}
        placeholder="Поиск по имени человека"
        renderItems={(items: Quest[]) =>
          !items.length ? (
            <div class="nothing-found">{filtersOn ? 'Ничего не найдено' : 'В системе нет ни одной задачи'}</div>
          ) : (
            items.map(q => (
              <ion-router-link href={buildRoute(routes.quest, { questId: q.id, questTitle: q.title })} class="quest">
                <div class="row">
                  <img class="photo" src={environment.photoHost + 'quests/' + q.id + '.jpg'} />
                  <div class="info">
                    <div class="title">{q.title}</div>
                    <div class="state">Статус: {this.renderQuestState(q)}</div>
                    <div class="tasks not-assigned">
                      Доступно заданий: {q.tasks.filter(t => !t.user).length}/{q.tasks.length}
                    </div>
                  </div>

                  <div class={'action-button ' + (this.canApplyToQuest(q) ? 'apply-button' : '')}>
                    {this.canApplyToQuest(q) && 'взять задание'}
                    <gpa-icon svg={ChevronIcon} />
                  </div>
                </div>
              </ion-router-link>
            ))
          )
        }
      />
    );
  }

  renderQuestState(q: Quest) {
    if (q.state == 'closed') {
      return 'Завершён';
    } else if (q.state == 'active') {
      return 'Активен';
    } else if (q.state == 'created') {
      return 'Не начался';
    }
  }
}
