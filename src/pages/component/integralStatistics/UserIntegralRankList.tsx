import React from 'react';
import { connect } from 'react-redux';
import { ConnectState, ConnectProps } from '@/models/connect';
import _ from 'lodash';
import './index.scss';
import { Carousel } from 'antd';
import { IUserIntegralRankTable } from '@/pages/types/integralStatistics';

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

interface IProps extends StateProps, ConnectProps {
  userIntegralRankList: IUserIntegralRankTable[]
}

interface IState {
  userRankListKiller: IUserIntegralRankTable[];
  userRankListDetective: IUserIntegralRankTable[];
  userRankListPeople: IUserIntegralRankTable[];
  userRankListTotal: IUserIntegralRankTable[];
}

class UserIntegralRankList extends React.Component<IProps> {
  state = {
    userRankListKiller: [],
    userRankListDetective: [],
    userRankListPeople: [],
    userRankListTotal: [],
  }

  async componentDidMount() {
    const params = {
      storeId: this.props.loginUserInfo.storeId,
    };
    await this.getListData(params);
  }

  getListData = async (params: any = {}) => {
    await this.props.dispatch({
      type: 'integralStatistics/getUserIntegralRankStatisticsListEffect',
      params: params
    });
    const userRankList = this.props.userIntegralRankList;
    await this.setState({
      userRankListKiller: userRankList[0],
      userRankListDetective: userRankList[1],
      userRankListPeople: userRankList[2],
      userRankListTotal: userRankList[3],
    });
  }

  render() {
    const { userRankListKiller,userRankListDetective,userRankListPeople,userRankListTotal } = this.state;
    return (
      <div>
        <Carousel autoplay >
          <div className="carousel-content">
            <article className="title-name">杀手积分榜</article>
            <div className="title-list">
              <span>名次</span>
              <span>昵称</span>
              <span>手机号</span>
              <span>积分</span>
              <span>称号</span>
            </div>

            {
              _.map(userRankListKiller, (item: IUserIntegralRankTable) => {
                return (
                  <div className="value-list" key={item.userInfo.id}>
                    <span><a>{ item.userInfo.killerRanking }</a></span>
                    <span>{ item.userInfo.nickname }</span>
                    <span>{ item.userInfo.phone }</span>
                    <span>{ item.userInfo.killerIntegral }</span>
                    <span>{ item.userInfo.killerTitle }</span>
                  </div>
                )
              })
            }
          </div>
          <div className="carousel-content">
            <article className="title-name">侦探积分榜</article>
            <div className="title-list">
              <span>名次</span>
              <span>昵称</span>
              <span>手机号</span>
              <span>积分</span>
              <span>称号</span>
            </div>

            {
              _.map(userRankListDetective, (item: IUserIntegralRankTable) => {
                return (
                  <div className="value-list" key={item.userInfo.id}>
                    <span><a>{ item.userInfo.detectiveRanking }</a></span>
                    <span>{ item.userInfo.nickname }</span>
                    <span>{ item.userInfo.phone }</span>
                    <span>{ item.userInfo.detectiveIntegral }</span>
                    <span>{ item.userInfo.detectiveTitle }</span>
                  </div>
                )
              })
            }
          </div>
          <div className="carousel-content">
            <article className="title-name">路人积分榜</article>
            <div className="title-list">
              <span>名次</span>
              <span>昵称</span>
              <span>手机号</span>
              <span>积分</span>
              <span>称号</span>
            </div>

            {
              _.map(userRankListPeople, (item: IUserIntegralRankTable) => {
                return (
                  <div className="value-list" key={item.userInfo.id}>
                    <span><a>{ item.userInfo.peopleRanking }</a></span>
                    <span>{ item.userInfo.nickname }</span>
                    <span>{ item.userInfo.phone }</span>
                    <span>{ item.userInfo.peopleIntegral }</span>
                    <span>{ item.userInfo.peopleTitle }</span>
                  </div>
                )
              })
            }
          </div>
          <div className="carousel-content">
            <article className="title-name">总积分榜</article>
            <div className="title-list">
              <span>名次</span>
              <span>昵称</span>
              <span>手机号</span>
              <span>积分</span>
              <span>称号</span>
            </div>

            {
              _.map(userRankListTotal, (item: IUserIntegralRankTable) => {
                return (
                  <div className="value-list" key={item.userInfo.id}>
                    <span><a>{ item.userInfo.totalRanking }</a></span>
                    <span>{ item.userInfo.nickname }</span>
                    <span>{ item.userInfo.phone }</span>
                    <span>{ item.userInfo.totalIntegral }</span>
                    <span>{ item.userInfo.totalTitle }</span>
                  </div>
                )
              })
            }
          </div>
        </Carousel>
      </div>
    )
  }
}

const mapStateToProps = (state: ConnectState) => ({
  loginUserInfo: state.loginManagement.userInfo,
  userIntegralRankList: state.integralStatistics.userRankList,
  loading: state.loading.global
});
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(UserIntegralRankList);
