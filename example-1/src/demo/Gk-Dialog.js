/**
 *Tip、Alert、Confirm、Dialog弹出层
**/
import React, {Component} from 'react';
import Dialog from '../common/Dialog';

export default class DialogTest extends Component {

	constructor(props){
		super(props);
		this.state = {
			showTip : false,
			showAlert : false,
			showConfirm : false,
			showDialog : false,
			tipText : ''
		}
	}

	//显示Tip层,3秒后自动关闭
	onShowTipView(){
		this.setState({
			showTip:true,
			tipText:'该tip层3秒后自动关闭'
		},()=>setTimeout(()=>this.setState({showTip:false}),3000))
	}
	
	//显示Alert层
	onShowAlertView(){
		this.setState({
			showAlert:true,
			tipText:'Alert弹出框'
		})
	}

	//显示Confirm层
	onShowConfirmView(){
		this.setState({
			showConfirm:true,
			tipText:'Confirm弹出框'
		})
	}

	//显示Dialog层
	onShowDialogView(){
		this.setState({
			showDialog:true,
			tipText:'Dialog弹出框'
		})
	}

	render(){
		return(
			<div>
				<ul>
					<li onClick={()=>this.onShowTipView()}>Tip弹出框</li>
					<li onClick={()=>this.onShowAlertView()}>Alert弹出框</li>
					<li onClick={()=>this.onShowConfirmView()}>Confirm弹出框</li>
					<li onClick={()=>this.onShowDialogView()}>Dialog弹出框</li>
				</ul>

				{/*Tip弹出框*/}
				<Dialog show={this.state.showTip} type={0} isHideButton={true}>
	                {this.state.tipText}
	            </Dialog>

				{/*Alert弹出框*/}
				<Dialog show={this.state.showAlert} type={0} onOkPress={()=>this.setState({showAlert:false})}>
	                {this.state.tipText}
	            </Dialog>

	            {/*Confirm弹出框*/}
				<Dialog show={this.state.showConfirm} type={1} okText="立即提交" cancelText="暂不提交" onOkPress={()=>this.setState({showConfirm:false})} onCancelPress={()=>this.setState({showConfirm:false})}>
	                {this.state.tipText}
	            </Dialog>

	            {/*Dialog弹出框*/}
				<Dialog show={this.state.showDialog} type={2} title="该用户未提供位置信息" onOkPress={()=>this.setState({showDialog:false})} onCancelPress={()=>this.setState({showDialog:false})}>
	                <div>
	                	<ul>
	                		<li>Dialog弹出框1</li>
	                		<li>Dialog弹出框2</li>
	                		<li>Dialog弹出框3</li>
	                	</ul>
	                </div>
	            </Dialog>	

			</div>
		)
	}
}