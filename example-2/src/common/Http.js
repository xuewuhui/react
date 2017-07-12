const AppInfos = require('./AppInfos.js');
const Consts = require('./Constants');
const { dispatchEvent } = require('./Events');
require('whatwg-fetch');
let expiredDone = false;	
let headers = {
	'Accept': 'application/json',
	'Content-Type': 'application/json'
}

module.exports = {
	
	// 账号被登出
  noAuthRedirect(){
		if (!expiredDone) {
		  expiredDone = true;
			dispatchEvent(Consts.Event.CLEARCOOKIE);
		}
  },

  //get
  get(url, successFunc, failFunc){
  	let that = this, token = AppInfos.getItem('token');
  	if(token) headers.Authorization = 'Token ' + token;

  	//timastamp
  	url += url.indexOf('?') > 0 ? '&' : '?';
  	url += 'timeStamps='+Date.parse(new Date());

  	fetch(url,{
  		method: 'get',
  		headers: headers
  	}).then((res) => {
  		if(res.ok){
  			res.json().then((data) => {
  				successFunc && typeof(successFunc) === 'function' && successFunc(data);
  			})
  		}else{
  			// 接口返回401，token失效
				if(res.status === 401){
          that.noAuthRedirect();
          return;
        }
        failFunc && typeof(failFunc) === 'function' && failFunc(res);
  		}
  	}).catch((error) => {
  		// 接口返回401，token失效
			if(error.status === 401){
        that.noAuthRedirect();
        return;
      }
      failFunc && typeof(failFunc) === 'function' && failFunc(error);
  	})
  },

  //post
  post(url, type, data, successFunc, failFunc){
  	let that = this, token = AppInfos.getItem('token');
  	if(token) headers.Authorization = 'Token ' + token;

  	fetch(url,{
  		method: type,
  		headers: headers,
  		body: data === null ? null : data
  	}).then((res) => {
  		if(res.ok){
  			res.json().then((data) => {
  				successFunc && typeof(successFunc) === 'function' && successFunc(data);
  			})
  		}else{ 	
  			// 接口返回401，token失效		
				if(res.status === 401){
          that.noAuthRedirect();
          return;
        }
        failFunc && typeof(failFunc) === 'function' && failFunc(res);
  		}
  	}).catch((error) => {
  		// 接口返回401，token失效
  		if(error.status === 401){
        that.noAuthRedirect();
        return;
      }
      failFunc && typeof(failFunc) === 'function' && failFunc(error);
  	})
  }
}
