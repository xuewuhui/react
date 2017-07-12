/**
 *用户详情View
**/
import React, {Component} from 'react';
import Http from '../../../common/Http';
import Consts from '../../../common/Constants';
import Utils from '../../../common/Utils';
import GkCity from '../../../common/GkCity';
import Feedback from './Feedback';
import Remark from './Remark';
import SelectComp from '../SelectComp';
import { Select, Modal, message, DatePicker } from 'antd';
import moment from 'moment';
const Option = Select.Option;
const provinceData = GkCity.provinceData;
const cityData = GkCity.cityData;

export default class ContractDetail extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentPage : 1,
      pageSize : 10,
      real_name : '',
      phone : '',
      gender : -1,
      birthday : null,
      user_type : -1,
      education : -1,
      expected_job_type : -1,
      idcard : '',
      province : provinceData[0],
      cities : cityData[provinceData[0]],
      city : cityData[provinceData[0]][0],
      create_time : null,
      dataSource : [],
      dataUserHistory : [],
      dataFeedSource : [],
      dataRemarkSource : []
    }
    this.candidateID = null;
  }

  //在组件接收到一个新的prop时被调用。这个方法在初始化render时不会被调用
  componentWillReceiveProps(nextProps){
    let data = nextProps.data;
        
    if(data !== this.props.data){
      let defaultProvice = data.province ? data.province : this.state.province;
      this.setState({
        dataSource : data,
        real_name : data.real_name,
        phone : data.phone,
        gender : data.gender,
        birthday : data.birthday ? moment(data.birthday) : this.state.birthday,
        user_type : data.user_type,
        education : data.profile && data.profile.education,
        expected_job_type : data.expected_job_type,
        school : data.profile && data.profile.school,
        school_grade : data.profile && data.profile.school_grade,
        idcard : data.idcard,
        province : defaultProvice,
        cities : cityData[defaultProvice],
        city :  cityData[defaultProvice][0],
        create_time : data.create_time
      })

      if(data.id){

        this.candidateID = data.id;

        //加载用户活动记录
        this.fetchCandidateHistory(data.id);

        //获取用户推荐合同
        this.fetchRecommendContractData(data.id);

        //加载用户备注
        this.fetchRemarkData(this.state.currentPage,this.state.pageSize,data.id);
      }
    }
  }

  //关闭用户详情
  handleCloseClick(){
  	this.props.changeDetailStatus && this.props.changeDetailStatus();
  }

  //获取应聘者活动历史记录
  fetchCandidateHistory(id){
    Http.get(
      Consts.Urls.CANDIDATE_HISTORY_URL+id,
      (data)=>{
        this.setState({dataUserHistory:data})
      }
    )
  }

  //获取用户备注
  fetchRemarkData(page,size,candidateID){
    let url = Consts.Urls.CANDIDATE_REMARK_URL+'?candidate='+candidateID+'&page='+page+'&count='+size;
    this.setState({currentPage: page});
    Http.get(
      url,
      (res)=>{
        this.setState({dataRemarkSource:res});
      },
      (error)=>{
        this.renderWarningView('信息加载失败');
      }
    )
  }

  //获取用户推荐合同
  fetchRecommendContractData(candidateID){
    Http.get(
      Consts.Urls.CANDIDATE_RECOMMEND_URL+'?candidate='+candidateID,
      (res)=>{
        console.log(res)
        if(res){
          //个人详情没有位置信息
          if(!res.lat || !res.lng){
            message.info('该用户未提供位置信息，请在推荐沟通中先与用户确认倾向位置');
          }

          //Map.initMap(res,res.lat,res.lng,candidate,applyPositionPress);
        }
      },
      (error)=>{
        this.renderWarningView('信息加载失败');
      }
    )
  }

  //选择省份
  onHandleProvinceChange(value){
    this.setState({
      province : value,
      cities: cityData[value],
      city: cityData[value][0],
    });
  }
  //选择城市 - 省份
  onHandleCityChange(value){
    this.setState({
      city_name: value,
    });
  }

  //修改用户属性
  onChangeAttributeClick(event,type){
    switch(type){
      case 0: //用户姓名
        this.setState({real_name:event.target.value});
        break;
      case 1: //手机号码
        this.setState({phone:event.target.value});
        break;
      case 2: //性别
        this.setState({gender:parseInt(event,10)});
        break;
      case 3: //生日
        this.setState({birthday:event});
        break;    
      case 4: //用户类型
        this.setState({user_type:parseInt(event,10)});
        break;
      case 5: //最高学历
        this.setState({education:parseInt(event,10)});
        break;
      case 6: //求职类型
        this.setState({expected_job_type:parseInt(event,10)});
        break; 
      case 7: //学校
        this.setState({school:event.target.value});
        break; 
      case 8: //年级
        this.setState({school_grade:event.target.value});
        break; 
      case 9: //身份证号
        this.setState({idcard:event.target.value});
        break;
      default:
                
    }
  }

  //提交用户备注
  onSubmitRemarkClick(candidateID,text,successCallback){
    this.props.changeView && this.props.changeView(true);
    Http.post(
      Consts.Urls.CANDIDATE_REMARK_URL,
      'post',
      JSON.stringify({
        candidate : candidateID,
        comment : text
      }),
      (data)=>{
        this.props.changeView && this.props.changeView(false);
        //加载用户备注
        this.setState({dataRemarkSource:[]},()=>this.fetchRemarkData(this.state.currentPage,this.state.pageSize,candidateID));
        successCallback && successCallback(data);
        data && data.detail && this.renderWarningView(data.detail,'check-circle');   
      },
      (error)=>{
        this.renderWarningView('信息提交失败');
        this.props.changeView && this.props.changeView(false);
      }
    )
  }

  //提交用户反馈
  onSubmitFeedbackClick(candidateID,feed_ids){
    this.props.changeView && this.props.changeView(true);
    console.log(JSON.stringify({
        candidate : candidateID,
        feedback : feed_ids
      }))
    Http.post(
      Consts.Urls.CANDIDATE_FEEDBACK_URL,
      'post',
      JSON.stringify({
        candidate : candidateID,
        feedback : feed_ids
      }),
      (data)=>{
        this.props.changeView && this.props.changeView(false);
        data && data.detail && this.renderWarningView(data.detail,'check-circle'); 
      },
      (error)=>{
        this.props.changeView && this.props.changeView(false);
        this.renderWarningView('信息提交失败');
      }
    )
  }

  //创建用户
  onCreateUserClick(candidateID,text,successCallback){
    let defaultUrl = Consts.Urls.CANDIDATE_CREATE_URL,
      type = this.candidateID !== null ? 'put' : 'post',
      url = this.candidateID !== null ? defaultUrl + this.candidateID +'/' : defaultUrl,
      idcard = this.state.idcard,
      data = {
        real_name: this.state.real_name,
        phone: this.state.phone,
        gender : this.state.gender,
        birth : this.state.birthday && this.state.birthday.format('YYYY-MM-DD'),
        user_type : this.state.user_type,
        expected_job_type : this.state.expected_job_type,
        education : this.state.education,
        province : this.state.province,
        city : this.state.city
      };

    if(this.state.user_type === 0){
      data.school = this.state.school;
      data.school_grade = this.state.school_grade;
    }
    idcard && (data.idcard = idcard);

    this.props.changeView && this.props.changeView(true);
    Http.post(
      url,
      type,
      JSON.stringify(data),
      (res)=>{
        this.props.changeView && this.props.changeView(false);
        res && res.detail && this.renderWarningView(res.detail,'check-circle');
        this.handleCloseClick && this.handleCloseClick();
      },
      (error)=>{
        this.props.changeView && this.props.changeView(false);
        this.renderWarningView(error.statusText);
      }
    )
  }

  //设置日期控件不可选择的日期
  disabledEndDate(current){
    return current && current.valueOf() > Date.now();
  }

  //渲染历史记录VIew
  renderHistoryView(){
    return this.state.dataUserHistory && this.state.dataUserHistory.application;
  }

  //渲染性别VIew
  renderGenderView(){
    let options = Consts.UserInfo.GENDER.map((k,i)=><option key={'gender-'+i} value={i}>{k}</option>);
    return(
      <SelectComp isSearch={false} value={this.state.gender} isDisabled={this.props.isDisabled} handleSelectClick={(e)=>this.onChangeAttributeClick(e,2)}>{options}</SelectComp>
    )
  }

  //渲染用户类型VIew
  renderUserTypeView(){
    let options = Consts.UserInfo.USER_TYPE.map((k,i)=><option key={'user-'+i} value={i}>{k}</option>);
    return(
      <SelectComp isSearch={false} value={this.state.user_type}  isDisabled={this.props.isDisabled} handleSelectClick={(e)=>this.onChangeAttributeClick(e,4)}>{options}</SelectComp>
    )
  }

  //渲染学历VIew
  renderEducationView(){
    let options = Consts.UserInfo.EDUCATION.map((k,i)=><option key={'education-'+i} value={i}>{k}</option>);
    return(
      <SelectComp isSearch={false} value={this.state.education}  isDisabled={this.props.isDisabled} handleSelectClick={(e)=>this.onChangeAttributeClick(e,5)}>{options}</SelectComp>
    )
  }

  //渲染求职类型VIew
  renderJobTypeView(){
    let options = Consts.UserInfo.JOB_TYPE.map((k,i)=><option key={'job-'+i} value={i}>{k}</option>);
    return(
      <SelectComp isSearch={false} value={this.state.expected_job_type}  isDisabled={this.props.isDisabled} handleSelectClick={(e)=>this.onChangeAttributeClick(e,6)}>{options}</SelectComp>
    )
  }

  //渲染必填Tip提醒
  renderTipView(){
    return this.props.isOwner && <span className="red-color">*</span>
  }

  //渲染warning提示
  renderWarningView(text,icon){
    Modal.warning({
      title: '提示',
      content: text,
      iconType : icon
    })
  }

  render(){

    //console.log(QQMap)

    const {isDisabled,isCreate,isOwner} = this.props,
          provinceOptions = provinceData.map((province) => <Option key={province}>{province}</Option>),
          cityOptions = this.state.cities.map(city => <Option key={city}>{city}</Option>);
    return(
		  <div className="area-content-right-block contract-detail">
        <div className="title">
          <h2>成员信息</h2>
        </div>

        <ul className="form-info">
          <li>
            <span className="jk-span small">{this.renderTipView()}用户姓名：</span>
            <input type="text" className="jk-text long view-show"  value={Utils.formatNone(this.state.real_name)} onChange={(e)=>this.onChangeAttributeClick(e,0)} disabled={isDisabled && 'disabled'} placeholder='请输入用户姓名' />
            <div className="clear"></div>
          </li>
          <li>
            <span className="jk-span small">{this.renderTipView()}手机号码：</span>
            <input type="text" className="jk-text long view-show" value={Utils.formatNone(this.state.phone)} onChange={(e)=>this.onChangeAttributeClick(e,1)} disabled={(isDisabled || (isOwner && !isCreate)) && 'disabled'} placeholder='请输入手机号码' />
            <div className="clear"></div>
          </li>
          <li>
            <span className="jk-span small">{this.renderTipView()}性别：</span>
            {this.renderGenderView()}
            <div className="clear"></div>
          </li>
          <li className="birthday">
            <span className="jk-span small">{this.renderTipView()}生日：</span>
            <DatePicker
              disabled={isDisabled}
              disabledDate={(date) => this.disabledEndDate(date)}
              allowClear={false}
              placeholder="请选择"
              value={this.state.birthday}
              format='YYYY-MM-DD'
              size='large'
              style={{width:'73%'}}
              onChange={(date)=>this.onChangeAttributeClick(date,3)}
            />
            <div className="clear"></div>
          </li>

          <li>
            <span className="jk-span small">{this.renderTipView()}省份：</span>
            <Select className="jk-text long" disabled={isDisabled} value={this.state.province} onChange={(value)=>this.onHandleProvinceChange(value)}>
              {provinceOptions}
            </Select>
            <div className="clear"></div>
          </li>

          <li>
            <span className="jk-span small">{this.renderTipView()}城市：</span>
            <Select className="jk-text long" disabled={isDisabled} value={this.state.city} onChange={(value)=>this.onHandleCityChange(value)}>
              {cityOptions}
            </Select>
            <div className="clear"></div>
          </li>
          <li>
            <span className="jk-span small">{this.renderTipView()}用户类型：</span>
            {this.renderUserTypeView()}
            <div className="clear"></div>
          </li>
          <li>
            <span className="jk-span small">{this.renderTipView()}最高学历：</span>
            {this.renderEducationView()}
            <div className="clear"></div>
          </li>
          <li>
            <span className="jk-span small">{this.renderTipView()}求职类型：</span>
            {this.renderJobTypeView()}
            <div className="clear"></div>
          </li>

          {
            this.state.user_type === 0 &&
            <li>
              <span className="jk-span small">{this.renderTipView()}学校：</span>
              <input type="text" className="jk-text long view-show" value={Utils.formatNone(this.state.school)} onChange={(e)=>this.onChangeAttributeClick(e,7)} disabled={isDisabled && 'disabled'} placeholder='请输入学校'/>
              <div className="clear"></div>
            </li>
          }
          {
            this.state.user_type === 0 &&
            <li>
              <span className="jk-span small">{this.renderTipView()}年级：</span>
              <input type="text" className="jk-text long view-show" value={Utils.formatNone(this.state.school_grade)} onChange={(e)=>this.onChangeAttributeClick(e,8)} disabled={isDisabled && 'disabled'} placeholder='请输入年级' />
              <div className="clear"></div>
            </li>
          }

          <li>
            <span className="jk-span small">身份证号：</span>
            <input type="text" className="jk-text long view-show" value={Utils.formatNone(this.state.idcard)} onChange={(e)=>this.onChangeAttributeClick(e,9)} disabled={(isDisabled || (isOwner && !isCreate)) && 'disabled'} placeholder='请输入身份证号' />
            <div className="clear"></div>
          </li>

          {/*创建时间*/}
          {
            !isCreate && 
            <li>
              <span className="jk-span small">创建时间：</span>
              <input type="text" className="jk-text long view-show" value={Utils.formatNone(this.state.create_time)} disabled='disabled' />
              <div className="clear"></div>
            </li>
          }  

          {/*活动记录*/}
          {
            !isCreate && 
            <li>
              <span className="jk-span small">活动记录：</span>
              <textarea className="jk-text long view-show view-show-textarea" value={this.renderHistoryView()} disabled="disabled" />
              <div className="clear"></div>
            </li>
          }

          {/*地图*/}
          {
            !isCreate && 
            <li>
              <div className="container">地图</div>
            </li>
          }
        </ul>

        {/*编辑/查看状态下显示用户反馈*/}
        {
          !isCreate && 
          (
            <div>
              {/*用户反馈*/}
              <Feedback candidateID={this.props.data.id} data={this.state.dataFeedSource} onSubmitFeedback={(id,feedback)=>this.onSubmitFeedbackClick(id,feedback)} changeView={()=>this.props.changeView()} />

              {/*用户备注*/}
              <Remark candidateID={this.props.data.id} onFetchRemark={(page,size,id)=>this.fetchRemarkData(page,size,id)} onSubmitRemark={(id,text,fn)=>this.onSubmitRemarkClick(id,text,fn)} {...this.state} />
            </div>
          )
        }

        <div className="form-submit">
            {/*创建用户显示保存按钮*/}
            {
              isOwner && <button className="btn-submit save" onClick={()=>this.onCreateUserClick()}>保存成员信息</button>
            }           
            <button className="btn-submit cancel" onClick={()=>this.handleCloseClick()}>返回</button>
        </div>
      </div>
		)
	}
}