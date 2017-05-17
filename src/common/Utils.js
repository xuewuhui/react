import Consts from '../common/Constants';
module.exports = {

	/**
     * 截取文字(包括中文和英文)
     */
    subString(str, len, hasDot){
        if (str === null) {
            return '';
        }
        var newLength = 0;
        var newStr = '';
        var chineseRegex = /[^\x00-\xff]/g;
        var singleChar = '';
        var strLength = str.replace(chineseRegex, '**').length;
        for(var i = 0; i < strLength; i++) {
            singleChar = str.charAt(i).toString();
            if(singleChar.match(chineseRegex) != null) {
                newLength += 2;
            } else {
                newLength++;
            } if(newLength > len) {
                break;
            }
            newStr += singleChar;
        }

        if(hasDot && strLength > len) {
            newStr += "...";
        }
        return newStr;
    },

	/*
     * 空字符转换
     */
    convertEmpty(str){
        // 数字类型转成字符类型后返回
        if (typeof str === 'number') {
            return '' + str;
        }
        // 布尔类型转成字符'0'或'1'后返回
        // 取值判断时，需调用 parseInt() 方法
        if (typeof str === 'boolean') {
            if (str) {
                return '1';
            } else {
                return '0';
            }
        }
        // 判断是否是空字符串
        if (str === null || str === undefined || str === 'undefined' || str.toLowerCase() === 'null') {
            return '';
        }
        return str;
    },

    //2016-3-20 13:00:00 => 2016-3-20
    DateConversionToDays(time){
        if(time !== null && time !== undefined) {
            if(time.indexOf('T') > 0){
                return time.split('T')[0];
            }
            return time.split(' ')[0];
        } else {
            return '';
        }
    },

    isPhone(str){
        var reg = /^0?(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/;
        return reg.test(str);
    },

    //获取已选
    getCheckedSelected(id,name){
        /*var $list = $(id).find('input[name='+name+']:checked'),
            c_ids=[];
        $.each($list, function(i, e){
            c_ids.push($(e).attr('aid') && parseInt($(e).attr('aid')));
        });
        return c_ids;*/
    },

	//分页范围计算
	range(start = 0, stop = null, step = 1) {
		let [_start, _stop] = [0, start];
		if(stop !== null) {
			[_start, _stop] = [start, stop];
		}
		const length = Math.max(Math.ceil((_stop - _start) / step), 0);
		const range = Array(length);
		for(let idx = 0; idx < length; idx++, _start += step) {
			range[idx] = _start;
		}
		return range;
	},

	//设置分页middlePage值
	pageRang(totalCount,pageSize){
		let count,
			pageCount = Math.ceil(totalCount / pageSize);	
		switch(pageCount){
			case 0:
				count = 0;
				break;
			case 1:
			case 2:
				count = 1;
				break;
			case 3:
				count = 2;
				break;
			case 4:
			case 5:
				count = 3;
				break;
			case 6:
				count = 4;
				break;	
			default : 
				count = 5;
		}
		return count;
	},

	/**
	* 渲染Render Component
	**/
	//渲染可见范围View
	renderVisibleRangeView(data){
		let range = data && data.length && data.sort().map(function(k,i){
			return Consts.UserInfo.LEVEL[k-1];
		});
		return range.join(',');
	}

























}

