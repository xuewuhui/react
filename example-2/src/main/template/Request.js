const { Modal } = require('antd');
const Http = require('../../common/Http');
const Consts = require('../../common/Constants');

module.exports = {

	//获取城市列表数据
	fetchCityData(successCallback){
		Http.get(
			Consts.Urls.CITY_URL,
			(data)=>{
				successCallback && successCallback(data);
			},
			(error)=>{
				Modal.warning({
					title: '提示',
					content: error.statusText
				})
			}
		)
	},

	//获取合同列表数据
	fetchContractData(successCallback){
		Http.get(
			Consts.Urls.CONTRACT_OBTAIN_MY_URL+'?count=1000',
			(data)=>{
				successCallback && successCallback(data);
			},
			(error)=>{
				Modal.warning({
					title: '提示',
					content: error.statusText
				})
			}
		)
	},

	//判断手机号码是否存在
	checkPhoneExsit(phone,successCallback,errorCallback){
		Http.get(
			Consts.Urls.PHONE_EXSIT_URL+phone,
			(data)=>{
				data && data.code ? successCallback && successCallback(data) : errorCallback && errorCallback(data);
			},
			(error)=>{
				errorCallback && errorCallback(error);
			}
		)
	}
}


