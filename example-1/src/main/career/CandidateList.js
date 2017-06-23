/**
 *应聘人员
**/
import React, {Component} from 'react';
import Http from '../../common/Http';
import Consts from '../../common/Constants';
import Header from '../template/Header';
import Silder from '../template/Silder';
import Search from '../template/Search';
import Request from '../template/Request';
import UserList from '../template/User/List';

export default class ContractObtain extends Component {

	constructor(props){
		super(props);
		this.state = {
			isDisabled : true,
			showDetail : false,
			showUserDetail : false,
			pageIndex : 1,
	    pageSize: 20,
	    currentPage: 1,
	    checkedItems:{},
	    dataUserSource : [],
	    dataUserDetailSource : [],
	    dataContractSource : [],
	    keyword : null,
	    task : -1,
			status : -1
		}
	}

	componentDidMount(){
		//获取合同列表数据
		Request.fetchContractData((data)=>{
			this.setState({dataContractSource:data});
		});

		//从详情返回定位数据页码
		const oldPageIndex = this.props.location && this.props.location.state && this.props.location.state.pageIndex;
		if(oldPageIndex){
			this.setState({
				pageIndex: oldPageIndex,
				currentPage: oldPageIndex
			},()=>this.fetchApplyListData());
		}else{
			this.fetchApplyListData();
		}	
	}

	componentWillUnmount(){
		//组件被移除时所有请求abort，并清空组件的请求array
		Consts.AjaxStart.length && Consts.AjaxStart.forEach((e)=>{
			e.abort && e.abort();
		});
		Consts.AjaxStart = [];
	}

	//获取申请列表数据
	fetchApplyListData() {
		let data = {
			page : this.state.pageIndex,
			count : this.state.pageSize
		}
		if (this.state.keyword) {
			data.q = this.state.keyword;
		}
		if (this.state.task && this.state.task > -1) {
			data.task = this.state.task;
		}
		if (this.state.status && this.state.status > -1) {
			data.status = this.state.status;
		}
		this.props.changeView && this.props.changeView(true);
		Http.gikooRequest(
			Consts.Urls.APPLY_MY_URL,
			'get',
			data,
			(data)=>{
				this.setState({
					dataUserSource : data
				});
				this.props.changeView && this.props.changeView(false);
			},
			(error)=>{
				this.props.changeView && this.props.changeView(false);
				if(error.status !== 0){ //请求abort除外
					alert(error.responseText && JSON.parse(error.responseText).detail);
				}
			}
		)
	}

	//页码跳转
	handlePageClick(idx){
		this.setState({pageIndex:idx},()=>this.fetchApplyListData());
	}

	//申请搜索
	handleSearchApplyClick(keyword,city,task,status){
		this.setState({
			pageIndex:1,
			keyword : keyword,
			task : task,
			status : status,
			dataUserSource : []
		},()=>this.fetchApplyListData());		
	}

	//查看用户详情
	handleShowUserDetailClick(id){
		let path = this.props.match && this.props.match.path,
			location = path + '/' + id ,
			url = {
				pathname: location,
				search: '?some=search-string',
				hash: '#howday',
				state: {pageIndex:this.state.pageIndex}
			};
		this.props.history && this.props.history.push && this.props.history.push(url);
	}

	//渲染申请列表
	renderListView(){
		return(
			<div>
        <div className="title">
            <h2>应聘人员</h2>
        </div>
        <div className="block-content">
        	{/*搜索部分*/}
          <Search isShowCity={false} dataContractSource={this.state.dataContractSource} searchClick={(text,city,task,status)=>this.handleSearchApplyClick(text,city,task,status)} />

          {/*合同列表TABLE*/}
          <UserList {...this.state} showDetail={(id)=>this.handleShowUserDetailClick(id)} fetchData={(page)=>this.handlePageClick(page)} isDisabled={true} isApplication={true} isRecommend={false} />                 
        </div>
    </div>
		)
	}

	render(){
		return(
			<div className="warp">
				<Header title={'应聘人员'} {...this.props} />
				<div className="content">
					<Silder active_8={true} />
					<div className="content-right">
						<div className="area">
							<div className="area-content-right">
								<div className="area-content-right-block">
									{/*用户列表TABLE*/}
									{this.renderListView()}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}