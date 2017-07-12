import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import { registerEvent, unregisterEvent } from '../common/Events';
import Http from '../common/Http';
import Consts from '../common/Constants';
import AppInfos from '../common/AppInfos';
import Header from './template/Header';
import Silder from './template/Silder';
import '../css/home.css';

export default class Main extends Component {

	constructor(props){
		super(props);
		this.logoutHandler = () => {
			this.onLogoutClick();
		};
		this.clearCookieHandler = () => {
			this.clearCookie();
		};
	}

	componentDidMount(){
		// 注册登出回调事件
    registerEvent(Consts.Event.LOGOUT, this.logoutHandler);
    // 注册清除缓存回调事件
    registerEvent(Consts.Event.CLEARCOOKIE, this.clearCookieHandler);
	}

	componentWillUnmount() {     
    // 反注册登出回调事件
    unregisterEvent(Consts.Event.LOGOUT, this.logoutHandler);
    // 反注册清除缓存回调事件
    unregisterEvent(Consts.Event.CLEARCOOKIE, this.clearCookieHandler); 
  }

	// 登出
	onLogoutClick(){
		let that = this;
		that.props.changeView && that.props.changeView(true);
		Http.post(
			Consts.Urls.LOGOUT_URL,
			'post',
			null,
			(res)=>{
				that.clearCookie();
				that.props.changeView && that.props.changeView(false);
			},
			(error)=>{
				that.props.changeView && that.props.changeView(false);
				alert(error.statusText);
			}
		)
	}

	// 清除cookie
	clearCookie(){
		AppInfos.removeItem("GIKOOUN");
		AppInfos.removeItem("GIKOO-USR");
		AppInfos.removeItem("token");
		this.props.changeView && this.props.changeView(false);
		this.props.history && this.props.history.replace && this.props.history.replace('/');
	}

	render(){
		return(
			<div className="warp">
				{/*头部文件*/}
				<Header />
				<div className="content">
					{/*侧边栏*/}
					<Silder />
					<div className="content-right">
						<div className="area">
							<div className="area-content-right">
								{/*二级路由*/}
								<Switch>
									{
										this.props.routes && this.props.routes.map((route,i) => (
											<Route exact={route.exact} key={i} path={route.path} component={route.main} />
										))
									}
								</Switch>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
