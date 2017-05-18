//合同列表搜索View
import React, {Component,PropTypes} from 'react';
import Consts from '../../common/Constants';
import SelectComp from './SelectComp';
import $ from 'jquery';

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

	//搜索查询
	handleSearchClick(){
		let keyword = $.trim(this.refs.search.value),
			city_id = this.refs.city && this.refs.city.exportSelectedCity && this.refs.city.exportSelectedCity(),
			task_id = this.refs.contract && this.refs.contract.exportSelectedCity && this.refs.contract.exportSelectedCity(),
			status_id = this.refs.status && this.refs.status.exportSelectedCity && this.refs.status.exportSelectedCity();
		this.props.searchClick && this.props.searchClick(keyword,city_id,task_id,status_id);
	}

	//渲染城市Select View
    renderCitySelectView(){
        let data = this.props.dataCitySource,
        	options = data && data.detail && data.detail.active_city && data.detail.active_city.map((k)=><option key={'city-'+k.id} value={k.id}>{k.name}</option>)
        return(
            <SelectComp ref="city" isSearch={true}>{options}</SelectComp>
        )
    }

	//渲染合同Select View
    renderContractSelectView(){
        let data = this.props.dataContractSource,
        	options = data && data.results && data.results.length && data.results.map((k)=><option key={'contract-'+k.id} value={k.id}>{k.name}</option>)
        return(
            <SelectComp ref="contract" isSearch={true}>{options}</SelectComp>
        )
    }

	//渲染状态Select View
    renderStatusSelectView(){
        let options = Consts.UserInfo.APPLY_STATUS.map((k,i)=>k && <option key={'status-'+i} value={i}>{k}</option>);
        return(
            <SelectComp ref="status" isSearch={true}>{options}</SelectComp>
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





