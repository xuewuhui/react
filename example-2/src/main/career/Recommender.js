/**
 *推荐人员
**/
import React, {Component} from 'react';
import { Modal } from 'antd';
import Http from '../../common/Http';
import Consts from '../../common/Constants';
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
	    pageSize: 10,
	    currentContractPage: 1,
	    currentCandidatePage: 1,
	    checkedItems:{},
	    dataSource : [],
	    dataDetailSource : [],
	    dataUserSource : [],
	    dataUserDetailSource : null,
	    keyword : null,
	    isNoData : true,
		}
	}

	componentWillMount(){
		document.title = this.props.title;
	}

	componentDidMount(){
		this.fetchContractListData();
	}

	// 获取合同列表数据
	fetchContractListData() {
		let url = Consts.Urls.CONTRACT_OBTAIN_MY_URL+'?page='+this.state.currentContractPage+'&count='+this.state.pageSize+'';
		if(this.state.keyword)
			url += '&q='+this.state.keyword;

		this.props.changeView && this.props.changeView(true);
		Http.get(
			url,
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
				this.setState({isNoData : true});
				Modal.warning({
					title: '提示',
					content: error.statusText
				});
			}
		)
	}

	//合同页码跳转
	handleContractPageClick(idx,isBoolen){
		this.setState({currentContractPage:idx},()=>this.fetchContractListData());
	}

	//应聘者页码跳转
	handleCandidatePageClick(idx,isBoolen){
		this.setState({currentCandidatePage:idx},()=> this.fetchRecommendedListData());
	}

	//合同搜索
	handleSearchContract(keyword){
		this.setState({
			currentContractPage:1,
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
		Http.get(
			Consts.Urls.CONTRACT_OBTAIN_URL+id+'/',
			(data)=>{
				this.setState({dataDetailSource:data});
				this.props.changeView && this.props.changeView(false);
			},
			(error)=>{
				Modal.warning({
					title: '提示',
					content: '信息加载失败'
				});
				this.props.changeView && this.props.changeView(false);
			}
		)
	}

	//一天只能获取一次推荐者列表
	fetchRecommendedOnece(){
		this.props.changeView && this.props.changeView(true);
		Http.post(
			Consts.Urls.RECOMMEND_URL,
			'post',
			null,
			(data)=>{
				this.props.changeView && this.props.changeView(false);
				this.fetchRecommendedListData();
			},
			(error)=>{
				this.props.changeView && this.props.changeView(false);
				Modal.warning({
					title: '提示',
					content: error.statusText
				});
			}
		)
	}

	//获取推荐人员列表
	fetchRecommendedListData(){
		let url = Consts.Urls.RECOMMEND_USER_URL+'?page='+this.state.currentCandidatePage+'&count='+this.state.pageSize+'';
		this.setState({isFetchUser:true});
		this.props.changeView && this.props.changeView(true);
		Http.get(
			url,
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
		Http.get(
			Consts.Urls.CANDIDATE_DETAIL_URL+id+'/',
			(data)=>{
				this.setState({dataUserDetailSource:data});
				this.props.changeView && this.props.changeView(false);
			},
			(error)=>{
				Modal.warning({
					title: '提示',
					content: '信息加载失败'
				});
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
              <ContractList {...this.state} showDetail={(id)=>this.handleShowDetailClick(id)} fetchData={(page)=>this.handleContractPageClick(page,false)} />
              
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
          <UserList {...this.state} showDetail={(id)=>this.handleShowUserDetailClick(id)} fetchData={(page)=>this.handleCandidatePageClick(page,true)} isDisabled={true} isApplication={false} isRecommend={true} />
				}

				{/*用户详情信息*/}
				{
					this.state.showUserDetail &&
          <UserDetail data={this.state.dataUserDetailSource} changeDetailStatus={()=>this.handleShowUserListClick()} isDisabled={true} changeView={this.props.changeView} />
				}
			</div>
		)
	}
}