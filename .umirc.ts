import { IConfig } from 'umi-types';

const routes = [
  {
    path: '/',
    component: '../layouts/index',
    routes: [
      {
        path: '/login',
        component: '../pages/component/login/index'
      },
      {
        path: '/',
        component: '../pages/index',
        routes: [
          { path: '/',
            component: '../pages/component/content/index',
            routes: [
              {
                path: '/storeManagement',
                component: '../pages/component/storeManagement/index'
              },
              {
                path: '/playerManagement',
                component: '../pages/component/playerManagement/index'
              },
              {
                path: '/scriptManagement',
                component: '../pages/component/scriptManagement/index'
              },
              {
                path: '/deskManagement',
                component: '../pages/component/deskManagement/index'
              },
              {
                path: '/orderManagement',
                component: '../pages/component/orderManagement/index'
              },
              {
                path: '/orderHistoryList',
                component: '../pages/component/orderManagement/orderHistoryList'
              },
              {
                component: '../pages/component/404'
              }
            ]
          }
        ]
      }
    ]
  }
]

const path = require('path');

const _root = path.resolve(__dirname, '..');

function root(args: any) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}

// ref: https://umijs.org/config/
const {NODE_ENV} = process.env;
const uglifyJSOptions =
  NODE_ENV === 'production'
    ? {
      uglifyOptions: {
        // remove console.* except console.error
        compress: {
          drop_console: true,
          pure_funcs: ['console.error'],
        },
      },
    }
    : {};

// ref: https://umijs.org/config/
const config: IConfig =  {
  treeShaking: true,
  history: 'hash', // 'browser',
  routes,
  alias: {
    app: root('src')
  },
  cssLoaderOptions:{
    localIdentName:'[local]'
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'Daydreaming',
      dll: false,

      routes: {
        exclude: [
          /components\//,
        ],
      },
    }],
  ],
  devServer: {
    stats: 'minimal',
    hot: true,
    contentBase: './target/www/index.html',
    proxy: [{
      context: [
        '/service', // http://192.168.0.200:8081/service
        '/api'
      ],
      target: 'http://192.168.0.200:8081',
      // pathRewrite: { "^/a" : "/service" , "^/b" : "/service" },
      secure: false,
      changeOrigin: true,
      cookieDomainRewrite: 'localhost'
    }],
    watchOptions: {
      ignored: /node_modules/
    }
  },
  uglifyJSOptions
};

export default config;
