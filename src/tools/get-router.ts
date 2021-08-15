export function getRouter():HTMLIonRouterElement {
  return document.querySelector('ion-router');
}

export function onWillLeaveView(routePathName: string, callback: () => any) {
  getRouter().addEventListener('ionRouteWillChange', (e: CustomEvent) => {
    if (e.detail.from == routePathName) callback();
  });
};

export function onDidLeaveView(routePathName: string, callback: () => any) {
  getRouter().addEventListener('ionRouteDidChange', (e: CustomEvent) => {
    if (e.detail.from == routePathName) callback();
  });
};

