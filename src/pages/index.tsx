import React from 'react';
import './index.scss';
import LeftMenu from '@/pages/component/menu';
import router from 'umi/router';

class Main extends React.Component{

  componentDidMount() {
    router.push('/storeManagement')
  }

  render() {
    return (
      <div className="main">
        <header>Header</header>
        <div className='content'>
          <LeftMenu/>
          <div className='content-right'>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
