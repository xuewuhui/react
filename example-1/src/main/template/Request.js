import Http from '../../common/Http';
import Consts from '../../common/Constants';

module.exports = {

	//获取城市列表数据
	fetchCityData(successCallback){
		Http.gikooRequest(
			Consts.Urls.CITY_UEL,
			'get',
			null,
			(data)=>{
				successCallback && successCallback(data);
			},
			(error)=>{
				alert(error.responseText && JSON.parse(error.responseText).detail);
			}
		)
	},

	//获取合同列表数据
	fetchContractData(successCallback){
		Http.gikooRequest(
			Consts.Urls.CONTRACT_OBTAIN_MY_URL+'?count=1000',
			'get',
			null,
			(data)=>{
				successCallback && successCallback(data);
			},
			(error)=>{
				alert(error.responseText && JSON.parse(error.responseText).detail);
			}
		)
	},

	//判断手机号码是否存在
	checkPhoneExsit(phone,successCallback,errorCallback){
		Http.gikooRequest(
			Consts.Urls.PHONE_EXSIT_URL+phone,
			'get',
			null,
			(data)=>{
				data && data.code ? successCallback && successCallback(data) : errorCallback && errorCallback(data);
			},
			(error)=>{
				errorCallback && errorCallback(error);
			}
		)
	},

	

	






    
	
}


