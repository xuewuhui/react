//合同列表无数据提示View
import React, {Component} from 'react';
export default class NoData extends Component {
	render(){
		return(
			<tr><td colSpan={this.props.colspan}>暂无数据</td></tr>
		)
	}
}