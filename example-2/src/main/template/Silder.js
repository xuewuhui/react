import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
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
						<li>
							<NavLink className="icon icon-obtain" to="/career/ContractObtain">合同获取</NavLink>
						</li>
						<li>
							<NavLink className="icon icon-relation" to="/career/Recommender">推荐人员</NavLink>
						</li>
						<li>
							<NavLink className="icon icon-person" to="/career/MyResources">我的资源</NavLink>
						</li>
						<li>
							<NavLink className="icon icon-auto" to="/career/CandidateList">应聘人员</NavLink>
						</li>
					</ul>
				}
			</div>
		)
	}
}
