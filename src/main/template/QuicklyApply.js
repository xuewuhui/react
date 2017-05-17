/**
 *快速创建申请
**/
import React, {Component} from 'react';
import SelectComp from './SelectComp';
import PopupStore from './PopupStore';
import Request from './Request';
import Http from '../../common/Http';
import Consts from '../../common/Constants';
import Utils from '../../common/Utils';


export default class QuicklyApply extends Component {

	constructor(props){
		super(props);
		this.state = {
			phone : '',
			isShowError : false,
			isShowPop : false,
			isBtnActive : false,
			storeName : '请选择门店',
			errorText : '手机号码不正确',
			dataStoreSource : []
		}
		this.task_id = -1;
		this.store_id = -1;
	}

	//失去焦点验证手机号码
	onBlurPhoneClick(e){
		let phone = e.target.value;
		if(Utils.isPhone(phone)){
			Request.checkPhoneExsit(
				phone,
				()=>this.setState({isShowError:false,isBtnActive : this.checkParameterStatus()}),
				()=>this.setState({isShowError:true,errorText:'手机号码不存在',isBtnActive:false})
			)
		}else{
			this.setState({isShowError:true,isBtnActive:false})
		}
	}

	//输入手机号码
	onChangePhoneClick(e){
		this.setState({phone:e.target.value})
	}

	//选择合同后加载对应的门店Data
	onContractSelectClick(e){
		let that = this,
			id = e.target.value,
			data = that.props.dataContractSource,
			task_id = parseInt(id,10);
		this.task_id = task_id;
		this.setState({
			dataStoreSource:[],
			isBtnActive : !this.state.isShowError && this.checkParameterStatus()
		});
		if(task_id>-1){
			if(data && data.results && data.results.length){
				 return data.results.map(function(e){
					return e.id === task_id && that.setState({dataStoreSource:e.stores});
				})
			}
		}
	}

	//选择门店后回现
	onSelectItemClick(id,name){
		this.store_id = id;
		this.setState({
			storeName:name,
			isShowPop:false, 
			isBtnActive : !this.state.isShowError && this.checkParameterStatus()
		});
	}

	//判断快速申请参数状态
	checkParameterStatus(){
		if(!this.state.phone) return false;
		if(this.task_id < 0) return false;
		if(this.store_id < 0) return false;
		return true;
	}

	//重置表单From
	resetApplicationForm(){
		this.setState({
			phone : '',
			isBtnActive : false,
			isShowError : false,
			storeName : '请选择门店',
		})
		this.task_id = -1;
		this.store_id = -1;
	}

	//创建快速申请
	onCreateApplicationClick(){
		let data = {
				task : this.task_id,
				phone : this.state.phone,
				to_store : true,
				store : this.store_id
			}
		this.props.changeView && this.props.changeView(true);
		Http.gikooRequest(
			Consts.Urls.APPLY_URL,
			'post',
			JSON.stringify(data),
			(data)=>{
				this.props.changeView && this.props.changeView(false);
				this.props.fetchApply();
				this.resetApplicationForm();
				alert(data && data.detail);	
			},
			(error)=>{
				this.props.changeView && this.props.changeView(false);
				let response = JSON.parse(data.responseText);
				if(response.code === 4001){
					alert(response.detail);
					return;
				}
				alert("信息提交失败!");	
			}
		)
	}


    //渲染合同Select View
    renderContractSelectView(){
        let data = this.props.dataContractSource,
        	options = data && data.results && data.results.length && data.results.map((k)=><option key={'contract-'+k.id} value={k.id}>{k.name}</option>)
        return(
            <SelectComp ref="contract" isSearch={true} selectedID={this.task_id}handleSelectClick={(e)=>this.onContractSelectClick(e)}>{options}</SelectComp>
        )
    }

	render(){
		return(
			<div className="search application-quickly">
                <div className="remarks-title"><h3>快速创建申请</h3></div>
                <div className="form-info">
                    <ul>
                        <li> 手机号 :
                            <input type="text" className="user-search" placeholder="请输入手机号码" value={this.state.phone} onChange={(e)=>this.onChangePhoneClick(e)} onBlur={(e)=>this.onBlurPhoneClick(e)}  />
                            {
                            	this.state.isShowError && 
                            	<span className="error">{this.state.errorText}</span>
                            }
                            
                        </li>
                        {/*合同*/}
						<li>{this.renderContractSelectView()}</li>

                        {/*门店*/}
                        <li>
                            <input className="jk-text long view-show input-press" value={this.state.storeName} readOnly={true} onClick={()=>this.setState({isShowPop:true})} />
                            <div className="clear"></div>
                        </li>
                    </ul>
                    <div className="clear"></div>
                    <div className="form-submit">
                        <button className={this.state.isBtnActive ? 'save' : 'cancel'} disabled={!this.state.isBtnActive && 'disabled'} onClick={()=>this.onCreateApplicationClick()}>创建</button>
                        <button className="cancel" onClick={()=>this.resetApplicationForm()}>取消</button>
                    </div>
                </div>

                {/*选择门店弹出层*/}
                {
                	this.state.isShowPop &&
                	<PopupStore 
                		dataSource={this.state.dataStoreSource} 
                		hideViewClick={()=>this.setState({isShowPop:false})}
                		hideViewItemClick={(id,name)=>this.onSelectItemClick(id,name)}
                	 />
                }
            </div>
		)
	}
}