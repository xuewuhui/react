/**
 *合同列表View
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

	//渲染合同列表View
	renderListView(){
		const data = this.props.dataSource;
		if(data.results && !data.results.length){
			return <NoData colspan="7" />
		}
		return data.results && data.results.map((k)=>
			<Item key={'list-'+k.id} data={k} isChecked={this.state.checkedItems['list-'+k.id]} isDisabled={this.props.isDisabled} toggleCheckboxStatus={(id,status)=>this.toggleCheckboxStatus(id,status)} showDetailClick={(id)=>this.props.showDetail(id)} hasVisibleLevel={this.props.hasVisibleLevel} />
		)
	}

	render(){
		const data = this.props.dataSource;
		const {
      pageSize,
      currentContractPage,
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
                
              <th width="85px">
                合同名称
              </th>
              <th width="100px">
                品牌
              </th>
              <th width="100px">
                岗位名称
              </th>
              <th width="100px">
                有效时间标准
              </th>
              <th width="100px">
                单位佣金
              </th>
              {
              	this.props.hasVisibleLevel && <th width="100px">可见范围</th>
              }                  
              <th width="100px">
                结束时间
              </th>
            </tr>
            </thead>
            <tbody>
            	{this.renderListView()}
            </tbody>
            {
        		data.count !== null && data.count > 0
            	&&
            	<tfoot>
                <tr>
                  <td colSpan="7">
                  	<Pagination
		              	 showQuickJumper
		              	 current={currentContractPage}
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