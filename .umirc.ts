import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig =  {
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/login',
          component: '../pages/component/login/index'
        },
        { path: '/',
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
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  cssLoaderOptions:{
    localIdentName:'[local]'
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: false,
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
}

export default config;
