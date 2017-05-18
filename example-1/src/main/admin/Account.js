import React, {Component} from 'react';
import Header from '../template/Header';
import Silder from '../template/Silder';
import '../../css/public.css';
import '../../css/home.css';

export default class Account extends Component {

	componentDidMount(){
		
	}

	render(){
		
		return(
			<div className="warp">
				<Header title={'创建账号'} />
				<div className="content">
					<Silder active_1={true} />
					<div className="content-right">

					</div>
				</div>
			</div>
		)
	}
}