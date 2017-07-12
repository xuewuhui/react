/**
 *合同获取
**/
import React, {Component} from 'react';
import {Modal} from 'antd';
import Http from '../../common/Http';
import Consts from '../../common/Constants';
import Search from '../template/Search';
import Request from '../template/Request';
import List from '../template/Contract/List';
import Detail from '../template/Contract/Detail';

export default class ContractObtain extends Component {

	constructor(props){
		super(props);
		this.state = {
			showDetail : false,
			currentContractPage: 1,
	    pageSize: 20,
	    checkedItems:{},
	    dataSource : [],
	    dataCitySource : [],
	    dataDetailSource : [],
	    keyword : null,
	    city_id : -1,
	    isNoData : true,
		};
		this.mount = false;
	}

	componentDidMount(){
		// 获取城市列表数据
		Request.fetchCityData((data)=>{
			!this.mount && this.setState({dataCitySource:data});
		});
		this.fetchContractListData();
	}

	componentWillMount(){
		document.title = this.props.title;
	}

	componentWillUnmount(){
		this.mount = true;
	}

	// 获取合同列表数据
	fetchContractListData() {

		let url = Consts.Urls.CONTRACT_OBTAIN_URL+'?page='+this.state.currentContractPage+'&count='+this.state.pageSize+'';
		if(this.state.keyword)
			url += '&q='+this.state.keyword;
		if(this.state.city_id !== null && this.state.city_id > -1)
			url += '&city='+this.state.city_id;

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
				})	
			}
		)
	}

	//页码跳转
	handlePageClick(idx){
		this.setState({currentContractPage:idx},()=>this.fetchContractListData());
	}

	//合同搜索
	handleSearchContract(keyword,city_id){
		this.setState({
			currentContractPage:1,
			keyword : keyword,
			city_id : city_id,
			dataSource : []
		},()=>this.fetchContractListData());		
	}

	//领取合同
	handleContractObtainClick(){
		let that = this,
			items = this.state.checkedItems,
			select_ids = [];
		for(var o in items){  
			if(items[o]){
				select_ids.push(o && o.split('-')[1]);
			} 
		}   
		if (!select_ids.length) {
			Modal.warning({
				title: '提示',
				content: '请选择要领取的合同！'
			})
			return;
		}

		Modal.confirm({
			title: '提示',
			content: '确定要领取该合同吗？',
			onOk(){
				that.fetchObtainContract(select_ids)
			}
		})
	}

	//领取合同
	fetchObtainContract(ids){
		Http.post(
			Consts.Urls.OBTAIN_CONTRACT_URL,
			'post',
			JSON.stringify({task:ids}),
			(data)=>{
				if(data.code === 0){
					Modal.warning({
						title: '提示',
						content: data.detail
					});
					this.fetchContractListData();
				}
			},
			(error)=>{
				if(error.status === 400){
					Modal.warning({
						title: '提示',
						content: error.responseJSON && error.responseJSON.detail
					});
				}
			}
		)
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

	//渲染合同列表
	renderListView(){
		return(
			<div className="area-content-right-block">
        <div className="title">
           <h2>合同列表</h2>
        </div>
        <div className="block-content">

        	{/*搜索部分*/}
          <Search isShowCity={true} cityId={this.state.city_id} dataCitySource={this.state.dataCitySource} searchClick={(text,city)=>this.handleSearchContract(text,city)} />
          
          <div className="table-content">
              
            {/*合同列表TABLE*/}
            <List {...this.state} showDetail={(id)=>this.handleShowDetailClick(id)} fetchData={(page)=>this.handlePageClick(page)} />
            
            <div className="form-submit">
            	{
            		!this.state.isNoData
            		&& 
            		<button id="btn-receive" className="btn-submit save" onClick={()=>this.handleContractObtainClick()}>领取合同</button>
            	}
            </div>
          </div>    
      	</div>
    	</div>
		)
	}

	render(){
		return(
			<div>
				{/*合同列表*/}
				{this.renderListView()}

				{/*合同信息*/}
				{
					this.state.showDetail &&
            <Detail data={this.state.dataDetailSource} changeDetailStatus={()=>this.handleShowListClick()}  />
				}		
			</div>
		)
	}
}
