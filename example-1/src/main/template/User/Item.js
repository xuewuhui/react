/**
 *用户列表Item
**/
import React, {Component,PropTypes} from 'react';
import Consts from '../../../common/Constants';
import Utils from '../../../common/Utils';

export default class ListItem extends Component {

	static propTypes = {
		isDisabled: PropTypes.bool,
		isChecked: PropTypes.bool,
		isRecommend: PropTypes.bool,
	}

	static defaultProps = {
		isDisabled : false,
		isChecked : false,
		isRecommend : false
	}

	//checkbox 选择
	toggleChange(){
	    this.props.toggleCheckboxStatus 
	    && this.props.toggleCheckboxStatus(this.props.data.id,!this.props.isChecked)
	}

	//查看用户详情
	handleUserDetailClick(id){
		this.props.showDetailClick && this.props.showDetailClick(id);
	}

	//已推荐candidate table view
	renderRecommendItemView(){
		let data = this.props.data,
			response = this.props.isRecommend ? data.candidate : data,
			times = this.props.isRecommend ? data.last_activity_time : data.create_time,
			remark = data.latest_comment,
			remarkText = remark && data.latest_comment.comment;	
		return(
			<tr>
				{
					!this.props.isDisabled 
					&&
					<td>
						<input data-id={response.id} type="checkbox" name="task-checked" disabled={this.props.isDisabled && 'disabled'} checked={this.props.isChecked && 'checked'} onChange={()=>this.toggleChange()} />
					</td> 
				}
				<td><div className="task-name" title={response.real_name} onClick={()=>this.handleUserDetailClick(response.id)}>{response.real_name}</div></td>
				<td>{Consts.UserInfo.GENDER[response.gender]}</td>
				<td>{response.phone}</td>
				<td>{Consts.UserInfo.USER_TYPE[response.user_type]}</td>
				<td>{Consts.UserInfo.JOB_TYPE[response.expected_job_type]}</td>
				<td>{times}</td>
				{/*最新备注*/}
				{
					this.props.isRecommend && 
					<td>
						<div className="table-remark">
							<p>{Utils.subString(remarkText,100,true)}</p>
							<span className="fr">{remark && remark.create_time}</span>
							{Utils.convertEmpty(remark && remark.comment_user_name)}
						</div>
					</td>
				}	
			</tr>
		)
	}

	//已申请candidate table view
	renderApplyItemView(){
		let data = this.props.data;
		return(
			<tr>
				{
					!this.props.isDisabled 
					&&
					<td>
						<input data-id={data.id} type="checkbox" name="task-checked" disabled={this.props.isDisabled && 'disabled'} checked={this.props.isChecked && 'checked'} onChange={()=>this.toggleChange()} />
					</td> 
				}
				<td><div className="task-name" title={data.candidate_name} onClick={()=>this.handleUserDetailClick(data.candidate_id)}>{data.candidate_name}</div></td>
				<td>{data.candidate_phone}</td>
				<td>{data.task_name}</td>
				<td>{data.store_name}</td>
				<td>{Consts.UserInfo.APPLY_STATUS[data.status]}</td>
				<td>{data.last_update_time}</td>
				<td>{data.create_time}</td>
			</tr>
		)
	}
	
	render(){
		return(
			this.props.isApplication ? this.renderApplyItemView() : this.renderRecommendItemView()
		)
	}
}