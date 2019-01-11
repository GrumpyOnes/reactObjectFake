
import React from 'react'
import Logo from '../../component/logo/logo'
import {connect} from 'react-redux'
import {login} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile'
import imoocForm from '../../component/imooc-form/imooc-form'

class Login extends React.Component{
	constructor(props) {
	  super(props);
	  this.register = this.register.bind(this)
	}
	register(){
		console.log(this.props)
		this.props.history.push('/register')
	}
	render(){
		return (<div>
			<Logo></Logo>
			{this.props.redirectTo?<Redirect to={this.props.redirectTo} />:null}
			{this.props.msg?<p>{this.props.msg}</p>:null}
			<h2>登录页</h2>
			<WingBlank>
				<List>
					<InputItem
					onChange={v=>{this.props.handleChange('user',v)}}
					>用户</InputItem>
						<WhiteSpace />
					<InputItem
					onChange={v=>{this.props.handleChange('pwd',v)}}
					>密码</InputItem>
				</List>
				<Button type='primary'
					onClick={()=>{this.props.login(this.props.state)}}
				>登录</Button>
				<WhiteSpace />
				<Button type='primary' onClick={this.register}>注册</Button>
			</WingBlank>
		</div>)
	}
}
Login = connect(state=>state.user,
{login})(Login);
Login = imoocForm(Login)
export default Login