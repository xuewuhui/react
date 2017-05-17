/**
 *合同列表Item
**/
import React, {Component,PropTypes} from 'react';
import Consts from '../../../common/Constants';
import Utils from '../../../common/Utils';

export default class ListItem extends Component {

	static propTypes = {
		isDisabled: PropTypes.bool,
		isChecked: PropTypes.bool,
		hasVisibleLevel: PropTypes.bool,
	}

	static defaultProps = {
		isDisabled : false,
		isChecked : false,
		hasVisibleLevel : false
	}

	//checkbox 选择
	toggleChange(){
	    this.props.toggleCheckboxStatus 
	    && this.props.toggleCheckboxStatus(this.props.data.id,!this.props.isChecked)
	}

	//查看合同详情
	handleContractDetailClick(id){
		this.props.showDetailClick && this.props.showDetailClick(id);
	}

	render(){
		
		const data = this.props.data;
		const position_name = Utils.convertEmpty(data.position_name);
		return(
			<tr>
				{
					!this.props.isDisabled 
					&&
					<td>
						<input data-id={data.id} type="checkbox" name="task-checked" disabled={this.props.isDisabled && 'disabled'} checked={this.props.isChecked && 'checked'} onChange={()=>this.toggleChange()} />
					</td> 
				}
				<td><div className="task-name" title={data.name} onClick={()=>this.handleContractDetailClick(data.id)}>{data.name}</div></td>
				<td>{Utils.convertEmpty(data.brand_name)}</td>
				<td><div className="task-name" title={position_name}>{position_name}</div></td>
				<td>{(data.hired_time !== null && Consts.UserInfo.EffectiveTime[data.hired_time])}</td>
				<td>{Utils.convertEmpty(data.commission)}</td>
				{
					this.props.hasVisibleLevel 
					&&
					<td>{(data.visible_level && data.visible_level.length > 0 && Utils.renderVisibleRangeView(data.visible_level))}</td>
				}
				
				<td>{Utils.DateConversionToDays(data.end_time)}</td>
			</tr>
		)
	}
}