//Select Component
import React, {Component} from 'react';

export default class City extends Component {

	//select action
	onChangeSelect(e){
		this.props.handleSelectClick && this.props.handleSelectClick(e.target.value);
	}

	//在组件接收到一个新的prop时被调用。这个方法在初始化render时不会被调用
	// componentWillReceiveProps(nextProps){
	// 	nextProps.selectedID !== null && this.setState({select_id : nextProps.selectedID});
	// }

	render(){
		return(
			<select className={this.props.isSearch ? 'select-style' : 'jk-text long view-show'} value={this.props.value} onChange={(e)=>this.onChangeSelect(e)} disabled={this.props.isDisabled && 'disabled'}>
				<option value="-1">请选择</option>
				{this.props.children}
			</select>
		)
	}
}