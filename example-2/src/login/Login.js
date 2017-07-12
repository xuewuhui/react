import React, {Component} from 'react';
import $ from 'jquery';
import {Modal} from 'antd';
import Http from '../common/Http';
import Consts from '../common/Constants';
import AppInfos from '../common/AppInfos';
import Blowfish from '../common/Blowfish';
import '../css/login.css';

export default class Login extends Component {

	constructor(props){
		super(props);
		this.state = {
			userName: '',
			password: ''
		}
	}

	//登录
	onLoginClick(event){
		event.preventDefault();
		let that = this,
			userName = $.trim(that.state.userName),
			password = $.trim(that.state.password),
			domain = 'consultant',
			ENCRYPT_MAGIC_CODE = 'gikoo@2013';

		if(!userName){
			Modal.warning({
				title: '提示',
				content: '请填写用户名'
			})
			return;
		}

		if(!password){
			Modal.warning({
				title: '提示',
				content: '请填写密码'
			})
			return;
		}	

		var data = {
			email: userName,
			password: Blowfish.prototype.encrypt_with_pkcs7_bf(userName+ENCRYPT_MAGIC_CODE, password),
			domain: domain,
			platform:'mlp'
		};
		that.props.changeView && that.props.changeView(true);

		Http.post(
			Consts.Urls.LOGIN_URL,
			'post',
			JSON.stringify(data),
			(res)=>{
				return that.loginSuccess(res);
			},
			(error)=>{
				that.props.changeView && that.props.changeView(false);
				Modal.warning({
					title: '提示',
					content: error.statusText
				});
			}
		)
	}

	componentWillMount(){
		document.title = this.props.title;
	}

	componentDidMount(){
		let userInfo = AppInfos.getItem('GIKOO-USR') && JSON.parse(AppInfos.getItem('GIKOO-USR'));
		if(userInfo){
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
		let url = '/career/ContractObtain';
		if(data.role === 0) //顶级管理员
			url = '/admin/Contract';
		else if(data.user_type === 2) //招聘顾问
			url = '/recruitment/Application';
		this.props.history && this.props.history.replace && this.props.history.replace(url);
	}

	//更改用户名
	onChangeUserName(e){
		this.setState({userName:e.target.value})
	}

	//更改密码
	onChangePassword(e){
		this.setState({password:e.target.value})
	}

	render(){
		return(
			<form onSubmit={(e)=>this.onLoginClick(e)}>
				<ul className="login-form">
			    <li><img src={require("../images/login_logo.png")} width="269px" height="auto" alt="" /></li>
			    <li><input type="text" ref="userAccount" name="userAccount" className="user" placeholder="用户名" value={this.state.userName} onChange={(e)=>this.onChangeUserName(e)} /></li>
			    <li><input type="password" ref="password" name="password" className="password" placeholder="密码" value={this.state.password} onChange={(e)=>this.onChangePassword(e)} /></li>
			    <li>
			        <button type="submit" disabled={!(this.state.userName !== '' && this.state.password !== '')}>登&nbsp;&nbsp;录</button>
			    </li>
				</ul>
			</form>
		)
	}
}
