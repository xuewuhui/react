/**
 *应聘人员详情
**/
import React, {Component} from 'react';
import Http from '../../common/Http';
import Consts from '../../common/Constants';
import Header from '../template/Header';
import Silder from '../template/Silder';
import UserDetail from '../template/User/Detail';

export default class CandidateDetail extends Component {

	constructor(props){
		super(props);
		this.state = {
			dataUserDetailSource : []
		}
	}

	componentDidMount(){
		const id = this.props.match && this.props.match.params && this.props.match.params.id;
		this.fetCandidateDetail(id);
	}

	fetCandidateDetail(id){
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

	handleShowUserListClick(){
		const location = this.props.location,
			//hash = location.hash,
			//search = location.search,
			pageIndex = location.state && location.state.pageIndex,
			url = {
				pathname: '/career/CandidateList',
				state: {pageIndex:pageIndex}
			};
		this.props.history && this.props.history.push && this.props.history.push(url);
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
									{/*应聘人员详情*/}
									<UserDetail data={this.state.dataUserDetailSource} changeDetailStatus={()=>this.handleShowUserListClick()} isDisabled={true} changeView={this.props.changeView} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}

}