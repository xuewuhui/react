import React,{Component} from 'react';
import {DatePicker  } from 'antd';
import moment from 'moment';
const dateFormat = 'YYYY-MM-DD';

export default class App extends Component {
	
	onChange(date, dateString) {
	  console.log(dateString);
	}

	render(){
		return (
			<div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
				<div style={{alignSelf:'center'}}>

					<DatePicker defaultValue={moment('2015-01-01', dateFormat)} format={dateFormat} onChange={(date,dateString)=>this.onChange(date,dateString)} />
					<br /><br /><br />
					<DatePicker defaultValue={moment('2015-06-06', dateFormat)} disabled />

				</div>
				
			</div>
		)
	}
}