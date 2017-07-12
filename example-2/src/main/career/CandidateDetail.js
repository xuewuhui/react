/**
 *应聘人员详情
**/
import React, {Component} from 'react';
import Http from '../../common/Http';
import Consts from '../../common/Constants';
import UserDetail from '../template/User/Detail';

export default class CandidateDetail extends Component {

	constructor(props){
		super(props);
		this.state = {
			dataUserDetailSource : []
		}
	}

	componentWillMount(){
		document.title = this.props.title;
	}

	componentDidMount(){
		const id = this.props.match && this.props.match.params && this.props.match.params.id;
		this.fetCandidateDetail(id);
	}

	fetCandidateDetail(id){
		this.props.changeView && this.props.changeView(true);
		Http.get(
			Consts.Urls.CANDIDATE_DETAIL_URL+id+'/',
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
			currentCandidatePage = location.state && location.state.currentCandidatePage,
			url = {
				pathname: '/career/CandidateList',
				state: {currentCandidatePage: currentCandidatePage}
			};
		this.props.history && this.props.history.push && this.props.history.push(url);
	}

	render(){
		return(
			<div className="area-content-right-block">
				{/*应聘人员详情*/}
				<UserDetail data={this.state.dataUserDetailSource} changeDetailStatus={()=>this.handleShowUserListClick()} isDisabled={true} changeView={this.props.changeView} />
			</div>
		)
	}

}