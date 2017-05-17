import React, {Component,PropTypes} from 'react';
import '../css/alert.css';

export default class Dialog extends Component {

	constructor(props) {
        super(props);
        this.state = {
        	show: props.show,
        }
    }

    static propTypes = {
		title: PropTypes.string,
		okText : PropTypes.string,
		cancelText : PropTypes.string,
		isHideButton : PropTypes.bool,
	    onOkPress: PropTypes.func,
	    onCancelPress: PropTypes.func,
	}

	static defaultProps = {
		show: false,
		okText : '确定',
		cancelText : '取消',
		isHideButton : false,
	    title: '',
	    onOkPress: () => {},
	    onCancelPress: () => {},
	}

    //在组件接收到一个新的prop时被调用。这个方法在初始化render时不会被调用
    componentWillReceiveProps(nextProps) {
        this.setState({show: nextProps.show})
    }

    //渲染alert，confirm弹出框view
    renderAlertView(){
    	const {type,isHideButton,okText,cancelText,onOkPress,onCancelPress} = this.props;
    	return(
			<div className="alert-view">
                <div className="alert-text">{this.props.children}</div>
                {
                	!isHideButton && 
                	(
                		type ?
	                	<div>
	                		<a className="confirm-ok" onClick={()=>onOkPress()}>{okText}</a>
	                		<a className="confirm-ok confirm-calcel" onClick={()=>onCancelPress()}>{cancelText}</a>
	                	</div>
	                	:
	                	<div className="alert-buttons" onClick={()=>onOkPress()}>{okText}</div>
                	)
                }  
            </div>
    	)
    }

    //渲染Dialog弹出框view
    renderDialogView(){
    	const {title,isHideButton,okText,cancelText,onOkPress,onCancelPress} = this.props;

    	return(
			<div className="alert-view dialog-view">
                <h2>
                	<a className="btn-close" onClick={()=>onCancelPress()}></a>
                	{title}
                </h2>
                <div className="alert-text">{this.props.children}</div>
                {
                	!isHideButton && 
                	<div className="dialog-submit">
		                <a className="confirm-ok" onClick={()=>onOkPress()}>{okText}</a>
		                <a className="confirm-ok confirm-calcel" onClick={()=>onCancelPress()}>{cancelText}</a>
	                </div>
                }  
            </div>
    	)
    }


	render(){
		let Component = null;
		switch(this.props.type){
			case 0: //Alert
			case 1: //Confirm
				Component =  this.renderAlertView();
				break;
			default : //Dialog
				Component =  this.renderDialogView();	
		}

		return(
			<div className="container-alert" style={{display:this.state.show ? null : 'none'}}>{Component}</div>
		)
	}
}