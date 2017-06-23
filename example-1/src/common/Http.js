import $ from 'jquery';
import AppInfos from './AppInfos.js';
import Consts from './Constants';

let expiredDone = false;	

module.exports = {

	//清除cookie
	clearCookie(){
		AppInfos.removeItem("GIKOOUN");
		AppInfos.removeItem("GIKOO-USR");
		AppInfos.removeItem("token");
		Consts.Router && Consts.Router.history && Consts.Router.history.replace && Consts.Router.history.replace('/');
	},
	
	//账号被登出
  noAuthRedirect(){
		if (!expiredDone) {
		  expiredDone = true;
			this.clearCookie();
		}
  },

	gikooRequest(path, type, data, successCallback, errorCallback){
		let that = this,token = AppInfos.getItem('token');
		if (type.toLowerCase() === "get") {
			if (data != null) {
				data.gk_ajax_timestamp = Date.parse(new Date());
			} else {
				data = {
					"timeStamps": Date.parse(new Date())
				};
			}
		}

		let ajaxItem = $.ajax({
			url: path,
			type: type,
			beforeSend : function(XMLHttpRequest){
				XMLHttpRequest.setRequestHeader("Authorization", "Token " + token);
			},
			data: data,
			contentType: "application/json",
			dataType: "json",
			success: function(data) {
				if (successCallback !== null) {
					successCallback(data);
				}
			},
			error: function(xhr, type, exception) {
				if (errorCallback) {
					var ret = errorCallback(xhr, type, exception, data);
					if (ret === true) return;
				}
				if(xhr.status === 401){
           that.noAuthRedirect();
        }
			}
		});
		Consts.AjaxStart.push(ajaxItem);
	}
}