/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
import { CategoryInterface } from './components/gpa-searchable-content/gpa-searchable-content.component';
export namespace Components {
  interface GpaBreadcrumbs {
    crumbs: Array<{ href: string; render: () => string }>;
  }
  interface GpaCard {}
  interface GpaHeader {}
  interface GpaIcon {
    svg: string;
  }
  interface GpaLogin {}
  interface GpaProfile {}
  interface GpaQuest {
    questId: number;
  }
  interface GpaQuests {}
  interface GpaRoot {}
  interface GpaSearchableContent {
    categories: CategoryInterface[];
    clear: number;
    debounce: number;
    filterFn: (items: any[], query: string, categories?: CategoryInterface[]) => Promise<any[]>;
    /**
     * alternative to "categories" property. used when categories list should be updated on category change
     */
    getCategories: (currentCategories?: CategoryInterface[]) => CategoryInterface[];
    items: any[];
    placeholder: string;
    renderItems: (items: any[]) => string | string[];
  }
  interface GpaSpinner {}
  interface GpaTask {
    taskId: number;
  }
  interface GpaViewerDemo {}
  interface GpaViewerRuler {
    enabled: boolean;
  }
  interface GpaViewerZoom {}
}
declare global {
  interface HTMLGpaBreadcrumbsElement extends Components.GpaBreadcrumbs, HTMLStencilElement {}
  var HTMLGpaBreadcrumbsElement: {
    prototype: HTMLGpaBreadcrumbsElement;
    new (): HTMLGpaBreadcrumbsElement;
  };
  interface HTMLGpaCardElement extends Components.GpaCard, HTMLStencilElement {}
  var HTMLGpaCardElement: {
    prototype: HTMLGpaCardElement;
    new (): HTMLGpaCardElement;
  };
  interface HTMLGpaHeaderElement extends Components.GpaHeader, HTMLStencilElement {}
  var HTMLGpaHeaderElement: {
    prototype: HTMLGpaHeaderElement;
    new (): HTMLGpaHeaderElement;
  };
  interface HTMLGpaIconElement extends Components.GpaIcon, HTMLStencilElement {}
  var HTMLGpaIconElement: {
    prototype: HTMLGpaIconElement;
    new (): HTMLGpaIconElement;
  };
  interface HTMLGpaLoginElement extends Components.GpaLogin, HTMLStencilElement {}
  var HTMLGpaLoginElement: {
    prototype: HTMLGpaLoginElement;
    new (): HTMLGpaLoginElement;
  };
  interface HTMLGpaProfileElement extends Components.GpaProfile, HTMLStencilElement {}
  var HTMLGpaProfileElement: {
    prototype: HTMLGpaProfileElement;
    new (): HTMLGpaProfileElement;
  };
  interface HTMLGpaQuestElement extends Components.GpaQuest, HTMLStencilElement {}
  var HTMLGpaQuestElement: {
    prototype: HTMLGpaQuestElement;
    new (): HTMLGpaQuestElement;
  };
  interface HTMLGpaQuestsElement extends Components.GpaQuests, HTMLStencilElement {}
  var HTMLGpaQuestsElement: {
    prototype: HTMLGpaQuestsElement;
    new (): HTMLGpaQuestsElement;
  };
  interface HTMLGpaRootElement extends Components.GpaRoot, HTMLStencilElement {}
  var HTMLGpaRootElement: {
    prototype: HTMLGpaRootElement;
    new (): HTMLGpaRootElement;
  };
  interface HTMLGpaSearchableContentElement extends Components.GpaSearchableContent, HTMLStencilElement {}
  var HTMLGpaSearchableContentElement: {
    prototype: HTMLGpaSearchableContentElement;
    new (): HTMLGpaSearchableContentElement;
  };
  interface HTMLGpaSpinnerElement extends Components.GpaSpinner, HTMLStencilElement {}
  var HTMLGpaSpinnerElement: {
    prototype: HTMLGpaSpinnerElement;
    new (): HTMLGpaSpinnerElement;
  };
  interface HTMLGpaTaskElement extends Components.GpaTask, HTMLStencilElement {}
  var HTMLGpaTaskElement: {
    prototype: HTMLGpaTaskElement;
    new (): HTMLGpaTaskElement;
  };
  interface HTMLGpaViewerDemoElement extends Components.GpaViewerDemo, HTMLStencilElement {}
  var HTMLGpaViewerDemoElement: {
    prototype: HTMLGpaViewerDemoElement;
    new (): HTMLGpaViewerDemoElement;
  };
  interface HTMLGpaViewerRulerElement extends Components.GpaViewerRuler, HTMLStencilElement {}
  var HTMLGpaViewerRulerElement: {
    prototype: HTMLGpaViewerRulerElement;
    new (): HTMLGpaViewerRulerElement;
  };
  interface HTMLGpaViewerZoomElement extends Components.GpaViewerZoom, HTMLStencilElement {}
  var HTMLGpaViewerZoomElement: {
    prototype: HTMLGpaViewerZoomElement;
    new (): HTMLGpaViewerZoomElement;
  };
  interface HTMLElementTagNameMap {
    'gpa-breadcrumbs': HTMLGpaBreadcrumbsElement;
    'gpa-card': HTMLGpaCardElement;
    'gpa-header': HTMLGpaHeaderElement;
    'gpa-icon': HTMLGpaIconElement;
    'gpa-login': HTMLGpaLoginElement;
    'gpa-profile': HTMLGpaProfileElement;
    'gpa-quest': HTMLGpaQuestElement;
    'gpa-quests': HTMLGpaQuestsElement;
    'gpa-root': HTMLGpaRootElement;
    'gpa-searchable-content': HTMLGpaSearchableContentElement;
    'gpa-spinner': HTMLGpaSpinnerElement;
    'gpa-task': HTMLGpaTaskElement;
    'gpa-viewer-demo': HTMLGpaViewerDemoElement;
    'gpa-viewer-ruler': HTMLGpaViewerRulerElement;
    'gpa-viewer-zoom': HTMLGpaViewerZoomElement;
  }
}
declare namespace LocalJSX {
  interface GpaBreadcrumbs {
    crumbs?: Array<{ href: string; render: () => string }>;
  }
  interface GpaCard {}
  interface GpaHeader {}
  interface GpaIcon {
    svg: string;
  }
  interface GpaLogin {}
  interface GpaProfile {}
  interface GpaQuest {
    questId?: number;
  }
  interface GpaQuests {}
  interface GpaRoot {}
  interface GpaSearchableContent {
    categories?: CategoryInterface[];
    clear?: number;
    debounce?: number;
    filterFn: (items: any[], query: string, categories?: CategoryInterface[]) => Promise<any[]>;
    /**
     * alternative to "categories" property. used when categories list should be updated on category change
     */
    getCategories?: (currentCategories?: CategoryInterface[]) => CategoryInterface[];
    items: any[];
    onInputFocusChange?: (event: CustomEvent<boolean>) => void;
    onInputKeyDown?: (event: CustomEvent<KeyboardEvent>) => void;
    placeholder: string;
    renderItems: (items: any[]) => string | string[];
  }
  interface GpaSpinner {}
  interface GpaTask {
    taskId?: number;
  }
  interface GpaViewerDemo {}
  interface GpaViewerRuler {
    enabled?: boolean;
  }
  interface GpaViewerZoom {}
  interface IntrinsicElements {
    'gpa-breadcrumbs': GpaBreadcrumbs;
    'gpa-card': GpaCard;
    'gpa-header': GpaHeader;
    'gpa-icon': GpaIcon;
    'gpa-login': GpaLogin;
    'gpa-profile': GpaProfile;
    'gpa-quest': GpaQuest;
    'gpa-quests': GpaQuests;
    'gpa-root': GpaRoot;
    'gpa-searchable-content': GpaSearchableContent;
    'gpa-spinner': GpaSpinner;
    'gpa-task': GpaTask;
    'gpa-viewer-demo': GpaViewerDemo;
    'gpa-viewer-ruler': GpaViewerRuler;
    'gpa-viewer-zoom': GpaViewerZoom;
  }
}
export { LocalJSX as JSX };
declare module '@stencil/core' {
  export namespace JSX {
    interface IntrinsicElements {
      'gpa-breadcrumbs': LocalJSX.GpaBreadcrumbs & JSXBase.HTMLAttributes<HTMLGpaBreadcrumbsElement>;
      'gpa-card': LocalJSX.GpaCard & JSXBase.HTMLAttributes<HTMLGpaCardElement>;
      'gpa-header': LocalJSX.GpaHeader & JSXBase.HTMLAttributes<HTMLGpaHeaderElement>;
      'gpa-icon': LocalJSX.GpaIcon & JSXBase.HTMLAttributes<HTMLGpaIconElement>;
      'gpa-login': LocalJSX.GpaLogin & JSXBase.HTMLAttributes<HTMLGpaLoginElement>;
      'gpa-profile': LocalJSX.GpaProfile & JSXBase.HTMLAttributes<HTMLGpaProfileElement>;
      'gpa-quest': LocalJSX.GpaQuest & JSXBase.HTMLAttributes<HTMLGpaQuestElement>;
      'gpa-quests': LocalJSX.GpaQuests & JSXBase.HTMLAttributes<HTMLGpaQuestsElement>;
      'gpa-root': LocalJSX.GpaRoot & JSXBase.HTMLAttributes<HTMLGpaRootElement>;
      'gpa-searchable-content': LocalJSX.GpaSearchableContent & JSXBase.HTMLAttributes<HTMLGpaSearchableContentElement>;
      'gpa-spinner': LocalJSX.GpaSpinner & JSXBase.HTMLAttributes<HTMLGpaSpinnerElement>;
      'gpa-task': LocalJSX.GpaTask & JSXBase.HTMLAttributes<HTMLGpaTaskElement>;
      'gpa-viewer-demo': LocalJSX.GpaViewerDemo & JSXBase.HTMLAttributes<HTMLGpaViewerDemoElement>;
      'gpa-viewer-ruler': LocalJSX.GpaViewerRuler & JSXBase.HTMLAttributes<HTMLGpaViewerRulerElement>;
      'gpa-viewer-zoom': LocalJSX.GpaViewerZoom & JSXBase.HTMLAttributes<HTMLGpaViewerZoomElement>;
    }
  }
}
