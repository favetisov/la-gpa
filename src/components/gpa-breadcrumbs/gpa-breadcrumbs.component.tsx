import { Component, Host, h, Prop } from '@stencil/core';
import { routes } from '@src/tools/routes';
import ChevronIcon from '../../assets/icon/chevron-down.svg';
@Component({
  tag: 'gpa-breadcrumbs',
  styleUrl: 'gpa-breadcrumbs.component.scss',
  shadow: false,
})
export class GpaBreadcrumbs {
  @Prop() crumbs: Array<{ href: string; render: () => string }> = [];

  render() {
    return (
      <Host>
        <div class="pathes">
          {this.renderBreadcrumbLink({ href: routes.quests, render: () => 'Панель управления' })}
          {this.crumbs.map(b => [<gpa-icon svg={ChevronIcon} class="chevron" />, this.renderBreadcrumbLink(b)])}
        </div>
      </Host>
    );
  }

  renderBreadcrumbLink(b: { href: string; render: () => string }) {
    return <ion-router-link href={b.href}>{b.render()}</ion-router-link>;
  }
}
