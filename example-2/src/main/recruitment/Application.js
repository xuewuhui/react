import React, {Component} from 'react';
import Consts from '../../common/Constants';
import Header from '../template/Header';
import Silder from '../template/Silder';

export default class Application extends Component {

	componentDidMount(){
		console.log(this.props)
		Consts.Navigator = this.props;
	}

	render(){
		
		return(
			<div className="warp">
				<Header title={'申请列表'} {...this.props} />
				<div className="content">
					<Silder active_2={true} />
					<div className="content-right">

					</div>
				</div>
			</div>
		)
	}
}