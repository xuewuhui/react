/**
 *合同获取
**/
import React, {Component} from 'react';
import Http from '../../common/Http';
import Consts from '../../common/Constants';
import Header from '../template/Header';
import Silder from '../template/Silder';
import Search from '../template/Search';
import Request from '../template/Request';
import List from '../template/Contract/List';
import Detail from '../template/Contract/Detail';

export default class ContractObtain extends Component {

	constructor(props){
		super(props);
		this.state = {
			showDetail : false,
			pageIndex : 1,
		    pageSize: 20,
		    currentPage: 1,
		    checkedItems:{},
		    dataSource : [],
		    dataCitySource : [],
		    dataDetailSource : [],
		    keyword : null,
		    city_id : -1,
		    isNoData : true,
		};
	}

	componentDidMount(){
		//获取城市列表数据
		Request.fetchCityData((data)=>{
			this.setState({dataCitySource:data});
		});
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
		if(this.state.city_id !== null && this.state.city_id > -1){
			data.city = this.state.city_id;
		}
		this.props.changeView && this.props.changeView(true);
		Http.gikooRequest(
			Consts.Urls.CONTRACT_OBTAIN_URL,
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
	handlePageClick(idx){
		this.setState({pageIndex:idx},()=>this.fetchContractListData());
	}

	//合同搜索
	handleSearchContract(keyword,city_id){
		this.setState({
			pageIndex:1,
			keyword : keyword,
			city_id : city_id,
			dataSource : []
		},()=>this.fetchContractListData());		
	}

	//领取合同
	handleContractObtainClick(){
		let items = this.state.checkedItems,
			select_ids = [];
		for(var o in items){  
			if(items[o]){
				select_ids.push(o && o.split('-')[1]);
			} 
		}   
		if (!select_ids.length) {
			alert("请选择要领取的合同！");
			return;
		}

		if(confirm("确定要领取该合同吗？")){
			Http.gikooRequest(
				Consts.Urls.OBTAIN_CONTRACT_URL,
				'post',
				JSON.stringify({task:select_ids}),
				(data)=>{
					if(data.code === 0){
						alert(data.detail);
						this.fetchContractListData();
					}
				},
				(error)=>{
					if(error.status === 400){
						alert(error.responseJSON && error.responseJSON.detail);
					}
				}
			)
		}
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
			<div className="warp">
				<Header title={'合同获取'} {...this.props} />
				<div className="content">
					<Silder active_3={true} />
					<div className="content-right">
						<div className="area">
							<div className="area-content-right">

								{/*合同列表*/}
								{this.renderListView()}

								{/*合同信息*/}
								{
									this.state.showDetail &&
			                    	<Detail data={this.state.dataDetailSource} changeDetailStatus={()=>this.handleShowListClick()}  />
								}

							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}