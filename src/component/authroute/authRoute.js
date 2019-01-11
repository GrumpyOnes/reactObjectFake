import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {loadData} from '../../redux/user.redux'
import {connect} from 'react-redux'
class AuthRoute extends React.Component{
	componentDidMount(){
		//获取用户信息
		const publicList = ['/login','/register']
		const pathname = this.props.location.pathname;
		if(publicList.indexOf(pathname)>-1){
			return null
		}
		axios.get('http://localhost:3000/test.json').then(res=>{
			console.log('*****************')
			console.log(res);
		})
		axios.get('/user/info').then(res=>{
			if(res.status==200){
				console.log(res.data)
				console.log(this.props)
				if(res.data.code==0){
					this.props.loadData(res.data.data)
				}else{

					this.props.history.push('/login')
				}
			}
		})

		// 是否登录
		// 现在的url地址 logo无需跳转
	}
	render(){
		return null
	}
}
AuthRoute = withRouter(AuthRoute)
AuthRoute = connect(
	null,{loadData})(AuthRoute)
export default AuthRoute