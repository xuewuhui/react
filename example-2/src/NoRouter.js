import React, {Component} from 'react';
import AppInfos from './common/AppInfos';

export default class NoRouter extends Component {

	componentDidMount(){
		let userInfo = AppInfos.getItem('GIKOO-USR') && JSON.parse(AppInfos.getItem('GIKOO-USR'));
		if(userInfo){
			this.goToUrl && this.goToUrl(userInfo);
		}else{
			this.onBackToUrl('/login');
		}
	}

	//根据用户角色跳转对应模块
	goToUrl(data){
		let url = '/career/ContractObtain';
		if(data.role === 0) //顶级管理员
			url = '/admin/Contract';
		else if(data.user_type === 2) //招聘顾问
			url = '/recruitment/Application';
		this.onBackToUrl(url);
	}

	onBackToUrl(url){
		this.props.history && this.props.history.replace && this.props.history.replace(url);
	}

	render(){
		return(
			<div>404页面</div>
		)
	}
}