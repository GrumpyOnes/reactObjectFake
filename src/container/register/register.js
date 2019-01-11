import React from 'react'
import Logo from '../../component/logo/logo'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {register} from '../../redux/user.redux'
import {List,InputItem,WingBlank,WhiteSpace,Button,Radio} from 'antd-mobile'
class Register extends React.Component{
	constructor(props) {
	  super(props);
	  this.login = this.login.bind(this)
	  this.state = {
	  	type:'genius',
	  	user:'',
	  	pwd:'',
	  	repeatpwd:'',
	  };
	}
	login(){
		console.log(this.props)
		this.props.history.push('/login')

	}
	showState(){
		console.log(this.state)
	}
	handleChange(key,val){
		this.setState({
			[key]:val
		}) 
	}
	render(){
		const RadioItem = Radio.RadioItem
		console.log(this.props)
		return (<div>
			{this.props.redirectTo?<Redirect to={this.props.redirectTo} />:null}
			<Logo></Logo>
			{this.props.msg?<p>{this.props.msg}</p>:null}
			<h2>注册页</h2>
			<WingBlank>
				<List>
					<InputItem
					onChange={v=>this.handleChange('user',v)}
					>用户</InputItem>
						<WhiteSpace />
					<InputItem
					onChange={v=>this.handleChange('pwd',v)}
					>密码</InputItem>
					<WhiteSpace />
					<InputItem
					onChange={v=>this.handleChange('repeatpwd',v)}
					>确认密码</InputItem>
					<RadioItem 
					onChange={v=>this.handleChange('type','genius')}
					checked={this.state.type==='genius'}>
					牛人
					</RadioItem>
					<RadioItem
					onChange={v=>this.handleChange('type','boss')} 
					checked={this.state.type==='boss'}>
					BOSS
					</RadioItem>
				</List>
				<Button type='primary' onClick={()=>{this.props.register(this.state)}}>注册</Button>
				<WhiteSpace />
				<Button type='primary' onClick={this.login}>登录</Button>
			</WingBlank>
		</div>)
	}
}
Register = connect(state=>state.user,
	{register}
)(Register)
export default Register

