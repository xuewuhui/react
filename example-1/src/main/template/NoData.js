//合同列表无数据提示View
import React, {Component} from 'react';
export default class NoData extends Component {
	render(){
		let text = this.props.text ? this.props.text : '暂无数据';
		return(
			<tr><td colSpan={this.props.colspan}>{text}</td></tr>
		)
	}
}