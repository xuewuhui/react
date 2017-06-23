/**
 *自动申请
**/
import React, {Component} from 'react';
import Http from '../../common/Http';
import Consts from '../../common/Constants';
import Header from '../template/Header';
import Silder from '../template/Silder';
import Search from '../template/Search';
import Request from '../template/Request';
import UserList from '../template/User/List';
import UserDetail from '../template/User/Detail';

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
			status : -1,
	    isNoData : true,
		}
	}

	componentDidMount(){
		//获取合同列表数据
		Request.fetchContractData((data)=>{
			this.setState({dataContractSource:data});
		});

		this.fetchApplyListData();
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
			Consts.Urls.APPLY_MY_AUTO_URL,
			'get',
			data,
			(data)=>{
				this.setState({
					isNoData : data.count === 0,
					dataUserSource : data
				});
				this.props.changeView && this.props.changeView(false);
			},
			(error)=>{
				this.props.changeView && this.props.changeView(false);
				if(error.status !== 0){ //请求abort除外
					this.setState({isNoData : true});
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

	//关闭用户详情
	handleShowUserListClick(){
		this.setState({showUserDetail:false});
	}

	//查看用户详情
	handleShowUserDetailClick(id){
		this.setState({dataUserDetailSource:[],showUserDetail:true});
		this.props.changeView && this.props.changeView(true);
		Http.gikooRequest(
			Consts.Urls.CANDIDATE_DETAIL_URL+id+'/',
			'get',
			null,
			(data)=>{
				this.setState({dataUserDetailSource:data});
				this.props.changeView && this.props.changeView(false);
			},
			(error)=>{
				alert("信息加载失败");
				this.props.changeView && this.props.changeView(false);
			}
		)
	}

	//渲染申请列表
	renderListView(){
		return(
			<div>
                <div className="title">
                    <h2>申请列表</h2>
                </div>
                <div className="block-content">

                	{/*搜索部分*/}
                    <Search isShowCity={false} dataContractSource={this.state.dataContractSource} dataStatusSource={Consts.UserInfo.APPLY_STATUS} searchClick={(text,city,task,status)=>this.handleSearchApplyClick(text,city,task,status)} />

                    {/*合同列表TABLE*/}
                    <UserList {...this.state} showDetail={(id)=>this.handleShowUserDetailClick(id)} fetchData={(page)=>this.handlePageClick(page)} isDisabled={true} isApplication={true} isRecommend={false} />                 
                </div>
            </div>
		)
	}

	render(){
		return(
			<div className="warp">
				<Header title={'自动申请'} {...this.props} />
				<div className="content">
					<Silder active_7={true} />
					<div className="content-right">
						<div className="area">
							<div className="area-content-right">
								<div className="area-content-right-block">
									{/*用户列表TABLE*/}
									{this.renderListView()}

									{/*用户详情信息*/}
									{
										this.state.showUserDetail &&
				                    	<UserDetail data={this.state.dataUserDetailSource} changeDetailStatus={()=>this.handleShowUserListClick()} isDisabled={true} changeView={this.props.changeView} />
									}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}