import React,{Component} from 'react';
import {Button} from 'antd';

export default class App extends Component {
	render(){
		return (
			<div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
				<Button type="primary">Primary</Button>
			    <Button>Default</Button>
			    <Button type="dashed">Dashed</Button>
			    <Button type="danger">Danger</Button>
			    <br />
			    <Button type="primary" shape="circle" icon="search" />
			    <Button type="primary" icon="search">Search</Button>
			    <Button shape="circle" icon="search" />
			    <Button icon="search">Search</Button>
			    <br />
			    <Button shape="circle" icon="search" />
			    <Button icon="search">Search</Button>
			    <Button type="dashed" shape="circle" icon="search" />
			    <Button type="dashed" icon="search">Search</Button>
			    <Button type="primary" icon="poweroff">Click me!</Button>
			    <Button type="primary" loading={true}>Click me!</Button>
			</div>
		)
	}
}