import React from 'react'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import {BrowserRouter,Route,Switch, Redirect} from 'react-router-dom'
import NavLinkBar from '../navlink/navlink'
import Boss from '../../component/boss/boss'
import Genius from '../../component/genius/genius'
import User from '../user/user'
import {getMsgList,sendMsg,recvMsg} from '../../redux/chat.redux'
import Msg from '../msg/msg'
import QueueAnim from 'rc-queue-anim'
class Dashboard extends React.Component{
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}
	componentDidMount(){
		if(!this.props.chat.chatmsg.length){
			this.props.getMsgList()
			this.props.recvMsg()
		}
		
	}
	
	render(){
		const user = this.props.user
		console.log(user)
		const {pathname} = this.props.location
		const navList=[
				{path:'/boss',
				text:'牛人',
				icon:'boss',
				title:'牛人列表',
				component:Boss,
				hide: user.type =='genius'
			},{path:'/genius',
				text:'BOSS',
				icon:'genius',
				title:'BOSS列表',
				component:Genius,
				hide: user.type =='boss'
			},{path:'/msg',
				text:'消息',
				icon:'msg',
				title:'消息列表',
				component:Msg
			},{path:'/me',
				text:'我的',
				icon:'me',
				title:'个人中心',
				component:User
			}]
			const page = navList.find(v=>v.path===pathname)
			
		return !!page?(<div>
			<NavBar className='fixed-header' mode='dard'>{(navList.find(v=>v.path==pathname)||{}).title}</NavBar>
				<div style={{marginTop:45,zIndex:10,position:'relative'}}>
			
					<QueueAnim type='scaleX' duration={800}>
					  <Route key={page.path} path={page.path} component={page.component} ></Route>
					</QueueAnim>
			
				</div>
					
			<NavLinkBar data={navList}></NavLinkBar>
			</div>
			):<Redirect to='/msg'></Redirect>
	}
}
Dashboard = connect(state=>state,{
	getMsgList,recvMsg
})(Dashboard)
export default Dashboard