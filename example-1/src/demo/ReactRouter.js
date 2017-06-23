import React, {Component} from 'react';
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom';

const Home = () => {
	return(
		<div>
			<h2>Home</h2>
		</div>
	)
}

const About = () => {
	return(
		<div>
			<h2>About</h2>
		</div>
	)
}

const Topic = (match) => {
	console.log(match)
	return(
		<div>
			<h3>{match.match.params.topicId}</h3>
		</div>
	)
}

const Topics = (match) => {
	console.log(match)
	return(
		<div>
			<h2>Topics</h2>
			<ul>
				<li><Link to={`${match.match.url}/rendering`}>Rendering width React</Link></li>
				<li><Link to={`${match.match.url}/components`}>Components</Link></li>
				<li><Link to={`${match.match.url}/props-v-state`}>Props v. State</Link></li>
			</ul>

			<Route path={`${match.match.url}/:topicId`} component={Topic} />
			<Route exact path={match.match.url} render={()=>{
				return(
					<h3>Please select a topic</h3>
				)
			}} />
		</div>
	)	
}

export default class ContractObtain extends Component {

	render(){
		return(
			<div className="warp">
			<Router>
				<div>
					<ul>
						<li><Link to="/home">Home</Link></li>
						<li><Link to="/about">About</Link></li>
						<li><Link to="/topics">Topics</Link></li>
					</ul>
					<Switch>
						<Route exact path="/home" component={Home} />
						<Route path="/about" component={About} />
						<Route path="/topics" component={Topics} />
					</Switch>
				</div>
				</Router>
			</div>
		)
	}
}
