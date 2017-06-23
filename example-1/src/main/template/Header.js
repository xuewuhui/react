import React, {Component} from 'react';
import Http from '../../common/Http';
import Consts from '../../common/Constants';
import AppInfos from '../../common/AppInfos.js';

export default class Header extends Component {

	//登出
	onLogoutClick(){
		let that = this;
		that.props.changeView && that.props.changeView(true);
		Http.gikooRequest(
			Consts.Urls.LOGOUT_URL,
			'post',
			null,
			(res)=>{
				Http.clearCookie();
				that.props.changeView && that.props.changeView(false);
			},
			(error)=>{
				that.props.changeView && that.props.changeView(false);
				alert(JSON.parse(error.responseText).detail);
			}
		)
	}

	componentWillMount(){
		Consts.Router = this.props;
		let userInfo = AppInfos.getItem('GIKOO-USR') && JSON.parse(AppInfos.getItem('GIKOO-USR'));
		if(!userInfo){
			Http.clearCookie();
			return;
		}
	}

	render(){

		document.title = this.props.title || '招聘顾问';

		let userInfo = AppInfos.getItem('GIKOO-USR') && JSON.parse(AppInfos.getItem('GIKOO-USR')),
			icon = userInfo && userInfo.icon ? userInfo.icon : require('../../images/ico-person.png'),
			name = userInfo && userInfo.account_name ? userInfo.account_name : '欢迎你';

		return(
			<div className="header">
				<div className="logo">
					<img src={require('../../images/logo.png')} alt="" />
				</div>
				<div className="title">{this.props.title}</div>
				<div className="person">
					<img src={icon} alt="" />
					<span className="person-text">{name}</span>
					<img src={require('../../images/login-out.png')} alt="" className="logo-out" onClick={()=>this.onLogoutClick()} />
				</div>
			</div>
		)
	}
}