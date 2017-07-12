/**
 *用户备注View
**/
import React, {Component} from 'react';
import { Modal, Pagination} from 'antd';
import Utils from '../../../common/Utils';

export default class Remark extends Component {

	constructor(props){
		super(props);
		this.state = {
			remarks : '',
		}
	}

	//页码回调
	handlePageChange = (idx)=>{
		let id = this.props.candidateID;
		this.props.onFetchRemark && this.props.onFetchRemark(idx,this.props.pageSize,id);
	}

	//备注Textarea输入
	onChangeText(event){
		this.setState({remarks:event.target.value});
	}

	//提交备注
	handleSubmitRemarkClick(){
		let id = this.props.candidateID,
			text = this.state.remarks;
		if(!text){
			Modal.warning({
				title: '提示',
			    content: '请输入您对该应聘者的印象！'
			})
			return;
		}	
		this.props.onSubmitRemark && this.props.onSubmitRemark(id,text,(res)=>{
			this.setState({remarks:''})
		});
	}

	//渲染备注View
	renderRemarkView(){
		const source = this.props.dataRemarkSource;
		if(source.results && source.results.length){
			return source.results && source.results.map((k,i)=>{
				return(
					<tr key={'remark-'+i}>
						<td>
							<div className="remarks-item">
								<h4>{Utils.formatNone(k.comment_user_name)}</h4>
								<div className="remarks-text">
									{Utils.formatNone(k.comment)}
								</div>
								<p className="times">{Utils.formatNone(k.create_time)}</p>
							</div>	
						</td>
					</tr>
				)
			})
		}else{
			return <tr><td style={{textAlign:'center'}}>暂无数据！</td></tr>
		}
	}


	render(){
		const data = this.props.dataRemarkSource;
		const {
			pageSize,
			currentPage,
		} = this.props;

		return(
			<div className="remarks">
				<div className="remarks-title"><h3>备注</h3></div>
				<div className="remarks-list">
					<table className="jk-table jk-remarks-table">
						<tbody>{this.renderRemarkView()}</tbody>
						{
							data.count > 0 &&
							<tfoot>
								<tr>
                  <td style={{textAlign:'center'}}>
	                  <Pagination
											showQuickJumper
											current={currentPage}
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
				<div className="remarks-area">
					<textarea maxLength="140" placeholder="请输入您对该应聘者的印象" value={this.state.remarks} onChange={(e)=>this.onChangeText(e)}></textarea>
				</div>
				<div className="form-submit">
					<button className="btn-submit save" onClick={()=>this.handleSubmitRemarkClick()}>提交备注</button>
				</div>
			</div>
		)
	}
}