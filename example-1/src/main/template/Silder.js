import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AppInfos from '../../common/AppInfos.js';

export default class Header extends Component {

	render(){
		const userInfo = AppInfos.getItem('GIKOO-USR') && JSON.parse(AppInfos.getItem('GIKOO-USR')),
			role = userInfo && userInfo.role,
			user_type = userInfo && userInfo.user_type;

		return(
			<div className="content-left">

				{/*管理员*/}
				{role === 0 && 
					<ul className="menu-block">
						<li className={this.props.active_0 ? 'icon icon-entry active' : 'icon icon-entry'}><Link to='/admin/Contract'>合同录入</Link></li>
						<li className={this.props.active_1 ? 'icon icon-consultant active' : 'icon icon-consultant'}><Link to='/admin/Account'>创建账号</Link></li>
					</ul>
				}

				{/*招聘顾问*/}
				{user_type === 2 && 
					<ul className="menu-block">
						<li className={this.props.active_2 ? 'icon icon-record active' : 'icon icon-record'}><Link to='/recruitment/Application'>申请列表</Link></li>
					</ul>
				}

				{/*求职顾问*/}
				{user_type === 1 && 
					<ul className="menu-block">
						<li className={this.props.active_3 ? 'icon icon-obtain active' : 'icon icon-obtain'}><Link to='/career/ContractObtain'>合同获取</Link></li>
						<li className={this.props.active_4 ? 'icon icon-relation active' : 'icon icon-relation'}><Link to='/career/Recommender'>推荐人员</Link></li>
						<li className={this.props.active_5 ? 'icon icon-person active' : 'icon icon-person'}><Link to='/career/MyResources'>我的资源</Link></li>
						<li className={this.props.active_6 ? 'icon icon-record active' : 'icon icon-record'}><Link to='/career/RecordInfo'>申请记录</Link></li>
						<li className={this.props.active_7 ? 'icon icon-auto active' : 'icon icon-auto'}><Link to='/career/AutoApplication'>自动申请</Link></li>
						<li className={this.props.active_8 ? 'icon icon-auto active' : 'icon icon-auto'}><Link to='/career/CandidateList'>应聘人员</Link></li>
					</ul>
				}
			</div>
		)
	}
}