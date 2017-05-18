import React,{Component} from 'react';
import {TimePicker } from 'antd';
import moment from 'moment';

export default class App extends Component {
	
	onChange(time, timeString) {
	  console.log(time, timeString);
	}

	render(){
		return (
			<div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
				<TimePicker defaultValue={moment('13:30:56', 'HH:mm:ss')} onChange={()=>this.onChange()} />
			</div>
		)
	}
}