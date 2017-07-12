import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Main from './main/Main';

//loading
import Loading from './loading/Loading';

//404页面
import NoRouter from './NoRouter';

//登录
import Login from './login/Login';

//求职顾问
import ContractObtain from './main/career/ContractObtain';
import Recommender from './main/career/Recommender';
import MyResources from './main/career/MyResources';
import CandidateList from './main/career/CandidateList';
import CandidateDetail from './main/career/CandidateDetail';

import {message} from 'antd';

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
const RouteWithSubRoutes = (route) => (
  <Route exact={route.exact} path={route.path} render={props=>(
    <route.main {...props} routes={route.routes} />
  )} />  
)

//设置message全局配置
message.config({
  top: 200, //消息距离顶部的位置
  duration: 2 //默认自动关闭延迟时，单位秒
})

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      loading : false
    };
    this.routes = [
      {
        path: '/login',
        main: (props) => <Login {...props} title='招聘顾问' changeView={(v)=>this.onChangeLoadingView(v)} />
      },
      {
        path: '/',
        main: (props) => <Main {...props} changeView={(v)=>this.onChangeLoadingView(v)} />,
        routes: [
          {
            path: '/career/ContractObtain',
            main: (props) => <ContractObtain {...props} title='合同获取' changeView={(v)=>this.onChangeLoadingView(v)} />
          },
          {
            path: '/career/Recommender',
            main: (props) => <Recommender {...props} title='推荐人员' changeView={(v)=>this.onChangeLoadingView(v)} />
          },
          {
            path: '/career/MyResources',
            main: (props) => <MyResources {...props} title='我的资源' changeView={(v)=>this.onChangeLoadingView(v)} />
          },
          { 
            path: '/career/CandidateList',
            exact: true,
            main: (props) => <CandidateList {...props} title='应聘人员' changeView={(v)=>this.onChangeLoadingView(v)} />
          },
          { 
            path: '/career/CandidateList/:id',
            main: (props) => <CandidateDetail {...props} title='应聘人员' changeView={(v)=>this.onChangeLoadingView(v)} />
          },
          {
            main: (props) => <NoRouter {...props} />
          },
        ]
      }
    ]
  }

  //设置Loading状态
  onChangeLoadingView(value){
    this.setState({loading:value})
  }

  render() {
    return (
      <Router>
        <div>
          {this.state.loading && <Loading />}
          <Switch>
            {
              this.routes.map((route,i)=>(
                <RouteWithSubRoutes key={i} {...route} />
              ))
            }
          </Switch>
        </div>
      </Router>
    );
  }
}
