import React, {Component} from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Loading from './loading/Loading';
import Login from './Login';

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
				main: (props) => <Login changeView={(v)=>this.onChangeLoadingView(v)} {...props} />
			},
			{ 
				path: '/main/admin/Contract',
				main: (props) => <Contract changeView={(v)=>this.onChangeLoadingView(v)} {...props} />
			},
			{ 
				path: '/main/admin/Account',
				main: (props) => <Account changeView={(v)=>this.onChangeLoadingView(v)} {...props} />
			},
			{ 
				path: '/main/recruitment/Application',
				main: (props) => <Application changeView={(v)=>this.onChangeLoadingView(v)} {...props} />
			},
			{ 
				path: '/main/career/ContractObtain',
				main: (props) => <ContractObtain changeView={(v)=>this.onChangeLoadingView(v)} {...props} />
			},
			{ 
				path: '/main/career/Recommender',
				main: (props) => <Recommender changeView={(v)=>this.onChangeLoadingView(v)} {...props} />
			},
			{ 
				path: '/main/career/MyResources',
				main: (props) => <MyResources changeView={(v)=>this.onChangeLoadingView(v)} {...props} />
			},
			{ 
				path: '/main/career/RecordInfo',
				main: (props) => <RecordInfo changeView={(v)=>this.onChangeLoadingView(v)} {...props} />
			},
			{ 
				path: '/main/career/AutoApplication',
				main: (props) => <AutoApplication changeView={(v)=>this.onChangeLoadingView(v)} {...props} />
			},
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

			      {this.Routes.map((route, index) => (
			          <Route
			            key={index}
			            path={route.path}
			            exact={route.exact}
			            component={route.main}
			          />
			        ))}
			    </div>
			  </Router>
		)
	}
}