import React, {Component} from 'react';
import AppInfos from './common/AppInfos';
import './css/public.css';
import './css/home.css';

export default class Flow extends Component {

	componentDidMount(){
		let userInfo = AppInfos.getItem('GIKOO-USR') && JSON.parse(AppInfos.getItem('GIKOO-USR'));
		this.goToUrl && this.goToUrl(userInfo);
	}

	//根据用户角色跳转对应模块
	goToUrl(data){
		let url = '/login';
		if(data){
			if(data.role === 0) //顶级管理员
				url = '/admin/Contract';
			else if(data.user_type === 2) //招聘顾问
				url = '/recruitment/Application';
			else
				url = '/career/ContractObtain';
		}
		this.props.history && this.props.history.replace && this.props.history.replace(url);
	}

	render(){
		return(
			<div></div>
		)
	}
}
