import React, {Component} from 'react';

export default class NoRouter extends Component {

	componentDidMount(){
		this.props.history.replace('/');
	}

	render(){
		return(
			<div>404页面</div>
		)
	}
}