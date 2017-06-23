/**
 *推荐人员
**/
import React, {Component} from 'react';
import Http from '../../common/Http';
import Consts from '../../common/Constants';
import Header from '../template/Header';
import Silder from '../template/Silder';
import Search from '../template/Search';
import ContractList from '../template/Contract/List';
import ContractDetail from '../template/Contract/Detail';
import UserList from '../template/User/List';
import UserDetail from '../template/User/Detail';

export default class ContractObtain extends Component {

	constructor(props){
		super(props);
		this.state = {
			isDisabled : true,
			isFetchUser : false,
			showDetail : false,
			showUserDetail : false,
			pageIndex : 1,
		    pageSize: 20,
		    currentPage: 1,
		    checkedItems:{},
		    dataSource : [],
		    dataDetailSource : [],
		    dataUserSource : [],
		    dataUserDetailSource : null,
		    keyword : null,
		    isNoData : true,
		}
	}

	componentDidMount(){
		this.fetchContractListData();
	}

	componentWillUnmount(){
		//组件被移除时所有请求abort，并清空组件的请求array
		Consts.AjaxStart.length && Consts.AjaxStart.forEach((e)=>{
			e.abort && e.abort();
		});
		Consts.AjaxStart = [];
	}

	//获取合同列表数据
	fetchContractListData() {
		let data = {
			page : this.state.pageIndex,
			count : this.state.pageSize
		}
		if (this.state.keyword) {
			data.q = this.state.keyword;
		}
		this.props.changeView && this.props.changeView(true);
		Http.gikooRequest(
			Consts.Urls.CONTRACT_OBTAIN_MY_URL,
			'get',
			data,
			(data)=>{
				let items = {};
				data.results && data.results.map((k)=>items['list-'+k.id] = true);
				this.setState({
					isNoData : data.count === 0,
					dataSource : data,
					checkedItems: items,
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
	handlePageClick(idx,isBoolen){
		this.setState({pageIndex:idx},()=>isBoolen ? this.fetchRecommendedListData() : this.fetchContractListData());
	}

	//合同搜索
	handleSearchContract(keyword){
		this.setState({
			pageIndex:1,
			keyword : keyword
		},()=>this.fetchContractListData());		
	}

	//关闭合同详情
	handleShowListClick(){
		this.setState({showDetail:false});
	}

	//查看合同详情
	handleShowDetailClick(id){
		this.setState({showDetail:true});
		this.props.changeView && this.props.changeView(true);
		Http.gikooRequest(
			Consts.Urls.CONTRACT_OBTAIN_URL+id+'/',
			'get',
			null,
			(data)=>{
				this.setState({dataDetailSource:data});
				this.props.changeView && this.props.changeView(false);
			},
			(error)=>{
				alert("信息加载失败");
				this.props.changeView && this.props.changeView(false);
			}
		)
	}

	//一天只能获取一次推荐者列表
	fetchRecommendedOnece(){
		this.props.changeView && this.props.changeView(true);
		Http.gikooRequest(
			Consts.Urls.RECOMMEND_URL,
			'post',
			null,
			(data)=>{
				this.props.changeView && this.props.changeView(false);
				this.fetchRecommendedListData();
			},
			(error)=>{
				this.props.changeView && this.props.changeView(false);
				alert(error.responseJSON && error.responseJSON.detail);
			}
		)
	}

	//获取推荐人员列表
	fetchRecommendedListData(){
		let data = {
			page : this.state.pageIndex,
			count : this.state.pageSize
		}
		this.setState({isFetchUser:true});
		this.props.changeView && this.props.changeView(true);
		Http.gikooRequest(
			Consts.Urls.RECOMMEND_USER_URL,
			'get',
			data,
			(data)=>{
				this.setState({dataUserSource : data});
				this.props.changeView && this.props.changeView(false);
			},
			(error)=>{
				this.props.changeView && this.props.changeView(false);
				alert(error.responseJSON && error.responseJSON.detail);
			}
		)
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

	//渲染合同列表
	renderListView(){
		return(
			<div>
                <div className="title">
                    <h2>我的合同</h2>
                </div>
                <div className="block-content">

                	{/*搜索部分*/}
                    <Search searchClick={(text)=>this.handleSearchContract(text)} isShowSelect={false} keyword="搜索合同" />

                    <div className="table-content">
                        
                        {/*合同列表TABLE*/}
                        <ContractList {...this.state} showDetail={(id)=>this.handleShowDetailClick(id)} fetchData={(page)=>this.handlePageClick(page,false)} />
                        
                        <div className="form-submit">
                        	{
                        		!this.state.isNoData
                        		&& 
                        		<button id="btn-receive" className="btn-submit save" onClick={()=>this.fetchRecommendedOnece()}>获取推荐</button>
                        	}
                        </div>

                    </div>
                    
                </div>
            </div>
		)
	}

	render(){
		return(
			<div className="warp">
				<Header title={'推荐人员'} {...this.props} />
				<div className="content">
					<Silder active_4={true} />
					<div className="content-right">
						<div className="area">
							<div className="area-content-right">
								<div className="area-content-right-block">

									{/*合同列表*/}
									{this.renderListView()}

									{/*合同信息*/}
									{
										this.state.showDetail &&
				                    	<ContractDetail data={this.state.dataDetailSource} changeDetailStatus={()=>this.handleShowListClick()}  />
									}

									{/*用户列表TABLE*/}
									{
										this.state.isFetchUser && 
										
				                        <UserList {...this.state} showDetail={(id)=>this.handleShowUserDetailClick(id)} fetchData={(page)=>this.handlePageClick(page,true)} isDisabled={true} isApplication={false} isRecommend={true} />
									}

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