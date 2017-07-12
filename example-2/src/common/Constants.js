/**
*存储用户相关key
**/
const UserInfo = {
	TOKEN : 'user_token',
	ENCRYPT_MAGIC_CODE : 'gikoo@2013',
	EffectiveTime : ['特殊说明','1周','1月','入职3月','1年','无要求'],
	LEVEL : ['金','银','铜'],
	GENDER : ['男','女'],
	USER_TYPE : ['学生','上班族','已退休'],
	JOB_TYPE : ['全职','兼职','全部'],
	EDUCATION : ['小学','初中','高中或中专','大专','本科及以上'],
	APPLY_STATUS : ['已提交','面试','','','已录用','未录用','完成'],
}

/**
*测试环境/生产环境
**/
const DOMAIN_DEV = 'http://consultant.mps5dev.gikoo.cn/';
const DOMAIN_JOB = 'http://consultant.mlp5plus.gikoo.cn/';
const API_PREFIX = 'api/v1/';
const DOMAIN_TEST = window.location.href.indexOf('localhost') > -1 ? DOMAIN_DEV : DOMAIN_JOB;

/**
 * 存储应用中所有事件的名称
 */
 const Event = {
    LOGOUT: 'event_logout',
    CLEARCOOKIE: 'event_clear_cookie',
};

/**
*存储应用URL地址
**/
const Urls = {
	LOGIN_URL : DOMAIN_TEST + API_PREFIX + 'user/login/', //登录
	LOGOUT_URL : DOMAIN_TEST + API_PREFIX + 'user/logout/', //登出
	PHONE_EXSIT_URL : DOMAIN_TEST + API_PREFIX + 'consultant_candidate/check_phone/?phone=', //手机号码是否存在
	CITY_URL : 'http://job.gikoo.cn/api/v1/util/data/initial/', //城市列表
	APPLICATION_MY : DOMAIN_TEST + API_PREFIX + 'consultant_application/apply/my/?page=1&count=20', //申请列表
	CONTRACT_OBTAIN_URL : DOMAIN_TEST + API_PREFIX + 'consultant_task/position/', //合同列表
	OBTAIN_CONTRACT_URL : DOMAIN_TEST + API_PREFIX + 'consultant_task/position/pull/', //领取合同
	CONTRACT_OBTAIN_MY_URL : DOMAIN_TEST + API_PREFIX + 'consultant_task/position/my/', //我的合同列表
	RECOMMEND_URL : DOMAIN_TEST + API_PREFIX + 'consultant_task/position/my/recom_user/all/', //获取推荐一天一次
	RECOMMEND_USER_URL : DOMAIN_TEST + API_PREFIX + 'consultant_task/position/task/recom_user/all/', //获取推荐列表
	CANDIDATE_CREATE_URL : DOMAIN_TEST + API_PREFIX + 'consultant/register/candidate/', //创建用户
	CANDIDATE_DETAIL_URL : DOMAIN_TEST + API_PREFIX + 'consultant/candidate/', //用户详情
	CANDIDATE_HISTORY_URL : DOMAIN_TEST + API_PREFIX + 'consultant_user_pool/candidate/apply_history/?candidate=', //应聘者活动历史记录
	CANDIDATE_FEEDBACK_URL : DOMAIN_TEST + API_PREFIX + 'consultant_candidate/feedback/', //用户信息反馈
	CANDIDATE_REMARK_URL : DOMAIN_TEST + API_PREFIX + 'consultant_candidate/comment/', //用户信息备注
	CANDIDATE_RECOMMEND_URL : DOMAIN_TEST + API_PREFIX + 'consultant_user_pool/candidate/recomm_info/', //candidate的推荐任务
	APPLY_URL : DOMAIN_TEST + API_PREFIX + 'consultant_application/apply/', //申请URL
	APPLY_MY_URL : DOMAIN_TEST + API_PREFIX + 'consultant_application/apply/my/', //申请人列表
	APPLY_MY_AUTO_URL : DOMAIN_TEST + API_PREFIX + 'consultant_application/apply/my/from_store/', //自动申请列表
	APPLY_MY_CANDIDATE_URL : DOMAIN_TEST + API_PREFIX + 'consultant/candidate/my/', //我的资源列表
	
}

module.exports = {
	UserInfo : UserInfo,
	Event : Event,
	Urls : Urls
}