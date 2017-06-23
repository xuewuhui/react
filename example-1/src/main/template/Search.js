//合同列表搜索View
import React, {Component,PropTypes} from 'react';
import Consts from '../../common/Constants';
import SelectComp from './SelectComp';

export default class Search extends Component{

	static propTypes = {
		isDisabled : PropTypes.string,	
		isShowSelect : PropTypes.bool,
		isShowCity : PropTypes.bool,
	}

	static defaultProps = {
		keyword : '关键字',
		isShowSelect : true,
		isShowCity : true,
	}

	constructor(props){
		super(props);
		this.state = {
			city_id : this.props.cityId,
			task_id : this.props.taskId,
			status_id : this.props.statusId
		}
	}

	//搜索查询
	handleSearchClick(){
		let keyword = this.refs.search && this.refs.search.value;
		this.props.searchClick && this.props.searchClick(keyword,this.state.city_id,this.state.task_id,this.state.status_id);
	}

	//渲染城市Select View
  renderCitySelectView(){
      let data = this.props.dataCitySource,
      	options = data && data.detail && data.detail.active_city && data.detail.active_city.map((k)=><option key={'city-'+k.id} value={k.id}>{k.name}</option>)
      return(
        <SelectComp value={this.state.city_id} ref="city" isSearch={true} handleSelectClick={(value)=>{this.setState({city_id:value})}}>{options}</SelectComp>
      )
  }

	//渲染合同Select View
  renderContractSelectView(){
      let data = this.props.dataContractSource,
      	options = data && data.results && data.results.length && data.results.map((k)=><option key={'contract-'+k.id} value={k.id}>{k.name}</option>)
      return(
        <SelectComp value={this.state.task_id} isSearch={true} handleSelectClick={(value)=>{this.setState({task_id:value})}}>{options}</SelectComp>
      )
  }

	//渲染状态Select View
  renderStatusSelectView(){
      let options = Consts.UserInfo.APPLY_STATUS.map((k,i)=>k && <option key={'status-'+i} value={i}>{k}</option>);
      return(
        <SelectComp value={this.state.status_id} isSearch={true} handleSelectClick={(value)=>{this.setState({status_id:value})}}>{options}</SelectComp>
      )
  }

	render(){
		return(
			<div className="search">
        <input type="text" className="user-search" ref="search" placeholder={this.props.keyword} />

        {
        	this.props.isShowSelect &&
        	(
        		this.props.isShowCity 
          	?
          	/*城市*/
          	<div>{this.renderCitySelectView()}</div>
          	:
          	<div>
          		{/*合同*/}
							{this.renderContractSelectView()}

							{/*状态*/}
							{this.renderStatusSelectView()}
          	</div>
        	)
        }
        
        <div className="form-submit fl">
            <button className="btn-submit save" onClick={()=>this.handleSearchClick()}>搜索</button>
        </div>
    </div>
		)
	}
}