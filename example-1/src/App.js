import React, {Component} from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Flow from './Flow';

//404页面
import NoRouter from './NoRouter';

//loading
import Loading from './loading/Loading';

//登录
import Login from './main/login/Login';

//管理员
import Contract from './main/admin/Contract';
import Account from './main/admin/Account';

//招聘顾问
import Application from './main/recruitment/Application';

//求职顾问
import ContractObtain from './main/career/ContractObtain';
import Recommender from './main/career/Recommender';
import MyResources from './main/career/MyResources';
import RecordInfo from './main/career/RecordInfo';
import AutoApplication from './main/career/AutoApplication';
import CandidateList from './main/career/CandidateList';
import CandidateDetail from './main/career/CandidateDetail';

export default class App extends Component {

	constructor(props){
		super(props);
		this.state = {
			loading : false
		};

		this.Routes = [
			{ 
				path: '/',
				exact: true,
				main: (props) => <Flow changeView={(v)=>this.onChangeLoadingView(v)} {...props} />
			},			
			{
				path: '/login',
				main: (props) => <Login changeView={(v)=>this.onChangeLoadingView(v)} {...props} />
			},
			{ 
				path: '/admin/Contract',
				main: (props) => <Contract changeView={(v)=>this.onChangeLoadingView(v)} {...props} />
			},
			{ 
				path: '/admin/Account',
				main: (props) => <Account changeView={(v)=>this.onChangeLoadingView(v)} {...props} />
			},
			{ 
				path: '/recruitment/Application',
				main: (props) => <Application changeView={(v)=>this.onChangeLoadingView(v)} {...props} />
			},
			{ 
				path: '/career/ContractObtain',
				main: (props) => <ContractObtain changeView={(v)=>this.onChangeLoadingView(v)} {...props} />
			},
			{ 
				path: '/career/Recommender',
				main: (props) => <Recommender changeView={(v)=>this.onChangeLoadingView(v)} {...props} />
			},
			{ 
				path: '/career/MyResources',
				main: (props) => <MyResources changeView={(v)=>this.onChangeLoadingView(v)} {...props} />
			},
			{ 
				path: '/career/RecordInfo',
				main: (props) => <RecordInfo changeView={(v)=>this.onChangeLoadingView(v)} {...props} />
			},
			{ 
				path: '/career/AutoApplication',
				main: (props) => <AutoApplication changeView={(v)=>this.onChangeLoadingView(v)} {...props} />
			},
			{ 
				path: '/career/CandidateList',
				exact: true,
				main: (props) => <CandidateList changeView={(v)=>this.onChangeLoadingView(v)} {...props} />
			},
			{ 
				path: '/career/CandidateList/:id',
				main: (props) => <CandidateDetail changeView={(v)=>this.onChangeLoadingView(v)} {...props} />
			},
			{
				main: (props) => <NoRouter changeView={(v)=>this.onChangeLoadingView(v)} {...props} />
			}
		]
	}

	//设置Loading状态
	onChangeLoadingView(value){
		this.setState({loading:value})
	}

	render(){
		return(
			<Router>
		    <div>
		      {this.state.loading && <Loading />}
		      	<Switch>
		      	{this.Routes.map((route, index) => (
		          <Route 
		          	key={index}
		          	exact={route.exact}
		           	path={route.path}
		           	component={route.main} 
		          />
		        ))}		        
		      </Switch>
		    </div>
		  </Router>
		)
	}
}