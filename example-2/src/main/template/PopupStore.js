/**
 *门店列表弹出层View
**/
import React, {Component} from 'react';

export default class PopupStore extends Component {

	onHideViewClick(){
		this.props.hideViewClick && this.props.hideViewClick();
	}

	onSelectClick(id,name){
		this.props.hideViewItemClick && this.props.hideViewItemClick(id,name);
	}

	renderStoreListView(){
		let data = this.props.dataSource;
		if(data){
			if(data.length){
				return data.map((k)=><li key={'store-'+k.id} data-id={k.id} onClick={()=>this.onSelectClick(k.id,k.name)}>{k.name}</li>);
			}else{
				return <li className="tr">暂无数据</li>;
			}
		}else{
			return <li className="tr">暂无数据</li>;
		}
		
	}

	render(){
		let data = this.props.dataSource;
		return(
			<div className="popContainer">

	            <div className="popwindow task-view">
	                <h2><a className="wBox_close" onClick={()=>this.onHideViewClick()}></a><span>选择门店</span></h2>
	                <div className="popwindowinfo">
	                    <ul className="jk-task-store" style={{height:data.length > 13 && '400px'}}>
	                        {this.renderStoreListView()}
	                    </ul>
	                </div>
	            </div>
        	</div>
		)
	}
}