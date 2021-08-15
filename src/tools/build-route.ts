export function buildRoute(route: string, params?: { [key: string]: string | number }) {
  if (params) {
    for (const key in params) {
      route = route.replace(':' + key, encodeURI(params[key] + ''));
    }
  }
  return route;
}
