//城市City View
import React, {Component} from 'react';

export default class City extends Component {

	constructor(props){
		super(props);
		this.state = {
			select_id : -1
		}
	}

	//select 选择具体城市
	onChangeSelect(e){
		this.setState({select_id:e.target.value});
		this.props.handleSelectClick && this.props.handleSelectClick(e);
	}

	//输出已选择城市id
	exportSelectedCity(){
		return this.state.select_id;
	}

	//在组件接收到一个新的prop时被调用。这个方法在初始化render时不会被调用
	componentWillReceiveProps(nextProps){
		nextProps.selectedID !== null && this.setState({select_id : nextProps.selectedID});
	}

	render(){
		return(
			<select className={this.props.isSearch ? 'select-style' : 'jk-text long view-show'} value={this.state.select_id} onChange={(e)=>this.onChangeSelect(e)} disabled={this.props.isDisabled && 'disabled'}>
				<option value="-1">请选择</option>
				{this.props.children}
			</select>
		)
	}
}