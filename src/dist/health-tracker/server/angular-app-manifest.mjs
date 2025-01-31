
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 7483, hash: '41e7bb0af5f296ad17160e43b8623430e2e1508b4ba553d502a24310f7830c1f', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1032, hash: '80415e23b0f984318bd800a437bedaf6151b18cf702d166e3b293d055cfc8141', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 139713, hash: '5681fdcbdc09a8e9d844e65a2fd35576852009b0b3edb7bb38017d5adb20ce27', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-ANGYSFPN.css': {size: 7145, hash: 'GO6uXQ1EEho', text: () => import('./assets-chunks/styles-ANGYSFPN_css.mjs').then(m => m.default)}
  },
};
