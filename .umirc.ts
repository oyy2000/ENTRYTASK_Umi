import { defineConfig } from 'umi';

export default defineConfig({
  routes: [
    { path: '/', component: '@/pages/index' },
    // { path: '/products', component: '@/pages/products' },
    { path: '/login', component: '@/pages/login' },
    { path: '/details', component: '@/pages/details' },
    { path: '/search', component: '@/pages/search' },
  ],
  mfsu: {},
});
