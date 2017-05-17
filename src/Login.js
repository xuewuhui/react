import React, {Component} from 'react';
import $ from 'jquery';
import blowfish from 'blowfish';
import Http from './common/Http';
import Consts from './common/Constants';
import AppInfos from './common/AppInfos';
import './css/public.css';
import './css/login.css';

export default class Login extends Component {

	//登录
	onLoginClick(){

		let that = this,
			userEmailVal = $.trim(this.refs.userAccount.value),
			passwdVal = $.trim(this.refs.password.value),
			domain = 'consultant',
			ENCRYPT_MAGIC_CODE = 'gikoo@2013';

		if(!userEmailVal){
			alert("请填写用户名");
			return;
		}

		if(!passwdVal){
			alert("请填写密码");
			return;
		}	

		var data = {
			email: userEmailVal,
			password: blowfish(userEmailVal+ENCRYPT_MAGIC_CODE, passwdVal),
			domain: domain,
			platform:'mlp'
		};
		that.props.changeView && that.props.changeView(true);

		Http.gikooRequest(
			Consts.Urls.LOGIN_URL,
			'post',
			JSON.stringify(data),
			(res)=>{
				return that.loginSuccess(res);
			},
			(error)=>{
				that.props.changeView && that.props.changeView(false);
				alert(JSON.parse(error.responseText).detail);
			}
		)
	}

	componentDidMount(){
		const token = AppInfos.getItem('token'),
			userInfo = AppInfos.getItem('GIKOO-USR') && JSON.parse(AppInfos.getItem('GIKOO-USR'));
		if(token){
			this.goToUrl && this.goToUrl(userInfo);
		}
	}

	//登录成功返回
	loginSuccess(data){
		this.props.changeView && this.props.changeView(false);
		AppInfos.setItem('token',data.token);
		AppInfos.setItem("GIKOOUN",data.account_name);
		AppInfos.setItem("GIKOO-USR",JSON.stringify(data));
		this.goToUrl && this.goToUrl(data);
	}

	//根据用户角色跳转对应模块
	goToUrl(data){
		let url = '/main/career/ContractObtain';
		if(data.role === 0) //顶级管理员
			url = '/main/admin/Contract';
		else if(data.user_type === 2) //招聘顾问
			url = '/main/recruitment/Application';
		this.props.history.push(url);
	}

	render(){

		return(
			<div>
				<ul className="login-form">
				    <li><img src={require("./images/login_logo.png")} width="269px" height="auto" alt="" /></li>
				    <li><input type="text" ref="userAccount" name="userAccount" className="user" placeholder="用户名" /></li>
				    <li><input type="password" ref="password" name="password" className="password" placeholder="密码" /></li>
				    <li>
				        <button onClick={()=>this.onLoginClick()}>登&nbsp;&nbsp;录</button>
				    </li>
				</ul>
			</div>
		)
	}
}