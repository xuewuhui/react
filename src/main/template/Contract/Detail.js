/**
 *合同详情View
**/
import React, {Component} from 'react';
import Consts from '../../../common/Constants';
import Utils from '../../../common/Utils';


export default class ContractDetail extends Component {

	//关闭合同详情
	handleCloseClick(){
		this.props.changeDetailStatus && this.props.changeDetailStatus();
	}

	//渲染岗位福利待遇
	renderBenefitsView(data){
		return data && data.length && data.map(function(k){
			return k.name + '\n';
		})
	}

	render(){
		let data = this.props.data,
			poster = 'http://job.gikoo.cn/webapp/?position='+data.id+'#!/poster';;
		return(
			<div className="area-content-right-block contract-detail">
                <div className="title">
                    <h2>合同信息</h2>
                </div>

                <ul className="form-info">
                    <li>
                        <span className="jk-span small">合同名称：</span>
                        <div className="jk-text long view-show">{data.name}</div>
                        <div className="clear"></div>
                    </li>
                    <li>
                        <span className="jk-span small">合同简介：</span>
                        <div className="jk-text long view-show view-show-textarea">{data.description}</div>
                        <div className="clear"></div>
                    </li>
                    <li>
                        <span className="jk-span small">城市：</span>
                        <div className="jk-text long view-show">{data.citys && data.citys.length && data.citys[0].name}</div>
                        <div className="clear"></div>
                    </li>
                    <li>
                        <span className="jk-span small">品牌：</span>
                        <div className="jk-text long view-show">{data.brand && data.brand.name}</div>
                        <div className="clear"></div>
                    </li>
                    <li>
                        <span className="jk-span small">岗位：</span>
                        <div className="jk-text long view-show">{data.position && data.position.name}</div>
                        <div className="clear"></div>
                    </li>
                    <li>
                        <span className="jk-span small">岗位描述：</span>
                        <div className="jk-text long view-show view-show-textarea">{data.position && data.position.description}</div>
                        <div className="clear"></div>
                    </li>
                    <li>
                        <span className="jk-span small">岗位要求：</span>
                        <div className="jk-text long view-show view-show-textarea">{data.position && data.position.requirements.toString()}</div>
                        <div className="clear"></div>
                    </li>
                    <li>
                        <span className="jk-span small">福利待遇：</span>
                        <div className="jk-text long view-show view-show-textarea" >{this.renderBenefitsView(data.position && data.position.benefits)}</div>
                        <div className="clear"></div>
                    </li>
                    <li>
                        <span className="jk-span small">岗位海报链接：</span>
                        <div className="jk-text long view-show view-show-textarea" >{poster}</div>
                        <div className="clear"></div>
                    </li>
                    <li>
                        <span className="jk-span small">有效录用时间标准：</span>
                        <div className="jk-text long view-show">{data.hired_time !== null && Consts.UserInfo.EffectiveTime[data.hired_time]}</div>
                        <div className="clear"></div>
                    </li>
                    <li>
                        <span className="jk-span small">其他特殊说明：</span>
                        <div className="jk-text long view-show view-show-textarea" >{data.hired_time_detail}</div>
                        <div className="clear"></div>
                    </li>
                    <li>
                        <span className="jk-span small">有效录用佣金：</span>
                        <div className="jk-text long view-show">{data.commission}</div>
                        <div className="clear"></div>
                    </li>
                    <li>
                        <span className="jk-span small">可见范围：</span>
                        <div className="jk-text long view-show">{data.visible_level && data.visible_level.length > 0 && Utils.renderVisibleRangeView(data.visible_level)}</div>
                        <div className="clear"></div>
                    </li>
                    <li>
                        <span className="jk-span small">领取数量限制：</span>
                        <div className="jk-text long view-show">{data.max_pull_number}</div>
                        <div className="clear"></div>
                    </li>
                    <li>
                        <span className="jk-span small">开始日期：</span>
                        <div className="jk-text long view-show">{data.start_time && data.start_time.split(' ')[0]}</div>
                        <div className="clear"></div>
                    </li>
                    <li>
                        <span className="jk-span small">终止日期：</span>
                        <div className="jk-text long view-show">{data.end_time && data.end_time.split(' ')[0]}</div>
                        <div className="clear"></div>
                    </li>
                </ul>
                <div className="form-submit">
                    <button className="btn-submit save cancel" onClick={()=>this.handleCloseClick()}>关闭</button>
                </div>

            </div>
		)
	}
}