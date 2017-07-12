import React, {Component} from 'react';
import { dispatchEvent } from '../../common/Events';
import Consts from '../../common/Constants';
import AppInfos from '../../common/AppInfos.js';

export default class Header extends Component {

	//登出
	onLogoutClick(){
		dispatchEvent(Consts.Event.LOGOUT);
	}

	render(){
		
		const title = document.title;

		let userInfo = AppInfos.getItem('GIKOO-USR') && JSON.parse(AppInfos.getItem('GIKOO-USR')),
			icon = userInfo && userInfo.icon ? userInfo.icon : require('../../images/ico-person.png'),
			name = userInfo && userInfo.account_name ? userInfo.account_name : '欢迎你';

		return(
			<div className="header">
				<div className="logo">
					<img src={require('../../images/logo.png')} alt="" />
				</div>
				<div className="title">{title}</div>
				<div className="person">
					<img src={icon} alt="" />
					<span className="person-text">{name}</span>
					<img src={require('../../images/login-out.png')} alt="" className="logo-out" onClick={()=>this.onLogoutClick()} />
				</div>
			</div>
		)
	}
}
