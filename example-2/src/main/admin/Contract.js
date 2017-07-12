import React, {Component} from 'react';
import Consts from '../../common/Constants';
import Header from '../template/Header';
import Silder from '../template/Silder';

export default class Contract extends Component {

	componentWillMount(){
		Consts.Navigator = this.props;
	}

	render(){
		
		return(
			<div className="warp">
				<Header title={'合同录入'} {...this.props} />
				<div className="content">
					<Silder active_0={true} />
					<div className="content-right">
合同录入
					</div>
				</div>
			</div>
		)
	}
}