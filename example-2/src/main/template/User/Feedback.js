/**
 *用户反馈View
**/
import React,{Component} from 'react';
import {Modal} from 'antd';

export default class Feedback extends Component {

	constructor(props){
		super(props);
		this.feedback = [];
	}

	//提交反馈
	onSubmitFeedbackClick(){
		if(!this.feedback.length){
			Modal.warning({
				title: '提示',
			    content: '请选择反馈结果！',
			})
			return;
		}
		let id = this.props.candidateID;
		this.props.onSubmitFeedback && this.props.onSubmitFeedback(id,this.feedback);
	}

	//选择checkbox
	onSelectedClick(event,type){
		let that = this,
			checkbox = event.target;
		if(checkbox.value === 'on'){
			checkbox.value = 'off';
			that.feedback.push(type);
		}else{
			checkbox.value = 'on';
			that.feedback.map((k,i)=>k === type && that.feedback.splice(i,1));
		}
	}

	render(){
		return(
			<div className="remarks">
				<div className="remarks-title"><h3>反馈结果</h3></div>
				<div className="remarks-list">
					<input name="check-feedback" type="checkbox" onChange={(e)=>this.onSelectedClick(e,1)} /> 已停机&nbsp;&nbsp;&nbsp;&nbsp;
					<input name="check-feedback" type="checkbox" onChange={(e)=>this.onSelectedClick(e,2)} /> 面试无故未到
				</div>
				<div className="form-submit">
					<button className="btn-submit save" style={{width:'auto'}} onClick={()=>this.onSubmitFeedbackClick()}>提交反馈结果</button>	
				</div>
			</div>
		)
	}

}