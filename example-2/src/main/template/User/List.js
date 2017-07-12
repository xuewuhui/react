/**
 *用户列表View
**/
import React, {Component} from 'react';
import { Pagination } from 'antd';
import Item from './Item';
import NoData from '../NoData';

export default class List extends Component{

	constructor(props){
		super(props);
		this.state = {
			isAllChecked : true,
			checkedItems : {}
		}
	}

	//在组件接收到一个新的prop时被调用。这个方法在初始化render时不会被调用
	componentWillReceiveProps(nextProps){
		this.setState({
			checkedItems : nextProps.checkedItems,
			isAllChecked : this.isAllCheckedStatus()
		})
	}

	//判断全选按钮状态
	isAllCheckedStatus(){
		let items = this.props.checkedItems,
			checkAllStatus = true;	
		//判断子checkbox选择后全选checkbox状态
		for(var o in items){ 
			if(!items[o]){
				checkAllStatus = false;
				break;
			}
		}
		return checkAllStatus;
	}

	//全选checkbox
	toggleChangeCheckAll(){
		let isAllChecked = !this.state.isAllChecked;
		let items = this.state.checkedItems;
		const data = this.props.dataSource;
		if(data && data.results && data.results.length){
			 data.results.map((k)=>items['list-'+k.id] = isAllChecked);
		}
		this.setState({
	      checkedItems: items,
	      isAllChecked: isAllChecked,
	    })
	}

	//checkbox 选择
	toggleCheckboxStatus(id,status){
		let items = this.state.checkedItems,
			checkAllStatus = false;
		items['list-'+id] = status;
		//判断子checkbox选择后全选checkbox状态
		for(var o in items){ 
			if(!items[o]){
				checkAllStatus = false;
				break;
			} 
			checkAllStatus = true;
		}
		this.setState({
	      checkedItems: items,
	      isAllChecked : checkAllStatus
	    }) 
	}

	//页码回调
	handlePageChange = (idx)=>{
		this.props.fetchData && this.props.fetchData(idx);
	}

	//渲染用户列表View
	renderListView(){
		const data = this.props.dataUserSource;
		if(data.results && !data.results.length){
			return <NoData colspan="7" />
		}
		if(this.props.isApplication){ //申请列表Data
			return data.results && data.results.map((k)=>
				<Item key={'apply-'+k.id} data={k} isChecked={this.state.checkedItems['list-'+k.candidate_id]} isDisabled={this.props.isDisabled} toggleCheckboxStatus={(id,status)=>this.toggleCheckboxStatus(id,status)} showDetailClick={(id)=>this.props.showDetail(id)} isApplication={this.props.isApplication} isRecommend={this.props.isRecommend} />
			)
			
		}else{ //推荐列表Data
			return data.results && data.results.map((k)=>{
				let candidateID = this.props.isRecommend ? k.candidate.id : k.id;
					return <Item key={'list-'+candidateID} data={k} isChecked={this.state.checkedItems['list-'+candidateID]} isDisabled={this.props.isDisabled} toggleCheckboxStatus={(id,status)=>this.toggleCheckboxStatus(id,status)} showDetailClick={(id)=>this.props.showDetail(id)} isApplication={this.props.isApplication} isRecommend={this.props.isRecommend} />
				}	
			)
		}
		
	}

	render(){
		const data = this.props.dataUserSource,
			isApplication = this.props.isApplication,
			isRecommend = this.props.isRecommend;	
		const {
      pageSize,
      currentCandidatePage,
    } = this.props;

		return(
			<div className="task-list">
				<table className="jk-table task-table">
          <thead>
            <tr>
            	{
            		!this.props.isDisabled
            		&& 
            		<th width="50px">
                    <input type="checkbox" value="on" checked={this.state.isAllChecked} onChange={()=>this.toggleChangeCheckAll()} />
                </th>
            	}
                
              <th>用户姓名</th>
              <th>{isApplication ? '手机号码': '性别'}</th>
							<th>{isApplication ? '合同名称': '手机号码'}</th>
							<th>{isApplication ? '申请门店': '用户类型'}</th>
							<th>{isApplication ? '申请状态': '求职类型'}</th>
							<th>{
									isApplication ? '更新时间' : (isRecommend ? '最近活动时间' : '创建时间')
								}
							</th>
							{
								isApplication ? <th>创建时间</th> : (isRecommend && <th>最新备注</th>)
							}
            </tr>
          </thead>
          <tbody>
          	{this.renderListView()}
          </tbody>
          {
	      		data.count > 0
	          	&&
	        	<tfoot>
              <tr>
	              <td colSpan="7">
	              	<Pagination
	              	 showQuickJumper
	              	 current={currentCandidatePage}
	              	 pageSize={pageSize} 
	              	 total={data.count} 
	              	 showTotal={(total) => `共 ${total} 个`}
	              	 onChange={(e) => this.handlePageChange(e)} 
	              	/>
	              </td>
              </tr>
            </tfoot>	
          }            
        </table>
      </div>
		)
	}
}