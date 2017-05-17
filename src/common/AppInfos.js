module.exports = {


	//写cookies
	setItem(name, value) {
		var Days = 36500;
		var exp = new Date();
		exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
		document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString()+";path=/";
	},

	//读取cookies
	getItem(name) {
		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		arr = document.cookie.match(reg);
		if (arr && arr.length) {
			return unescape(arr[2]);
		}else {
			return null;
		}
	},

	//删除cookies
	removeItem(name) {
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval = this.getItem(name);
		if (cval !== null) {
			document.cookie = name + "=" + cval + ";path=/;expires=" + exp.toGMTString();
		}
	},
}