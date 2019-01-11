import React from 'react'
import {List,InputItem,NavBar,Icon,Grid} from 'antd-mobile'
import io from 'socket.io-client'
import {connect} from 'react-redux'
import {getMsgList,sendMsg,recvMsg,readMsg} from '../../redux/chat.redux'
import {getChatId} from '../util/util'
import QueueAnim from 'rc-queue-anim'
const socket = io('ws://localhost:9093')


class Chat extends React.Component{
	constructor(props) {
	  super(props);
	
	  this.state = {text:'',msg:[]};
	}
	componentDidMount(){
		// socket.on('recvmsg',(data)=>{
		// 	this.setState({msg:[...this.state.msg,data.text]})
		// })
		
		if (!this.props.chat.chatmsg.length) {
			this.props.getMsgList()
			this.props.recvMsg()	
		}
		
		
	}
	componentWillUnmount(){
		const to= this.props.match.params.user
		this.props.readMsg(to);
	}
	fixCarousel(){
		setTimeout(function(){
			window.dispatchEvent(new Event('resize'))
		},0)
	}
	handleSubmit(){
		//console.log(this.state)
		//socket.emit('sendmsg',this.state);
		const from = this.props.user._id
		const to = this.props.match.params.user
		const msg = this.state.text
		this.props.sendMsg({from,to,msg})
		this.setState({text:'',showEmoji:false})
	}
	render(){
		const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
										.split(' ')
										.filter(v=>v)
										.map(v=>({text:v}))
		const _userid = this.props.match.params.user
		const Item = List.Item
		const users = this.props.chat.users
		if(!users[_userid]){
			return null;
		}
		const chatid = getChatId(_userid,this.props.user._id)
		const chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatid ==chatid)
		return (<div id='chat-page'>
			<NavBar mode='dark'
				icon={<Icon type="left" />}
				onLeftClick={()=>{
					this.props.history.goBack();
				}}
			>
				{users[_userid].name}
			</NavBar>
			<QueueAnim delay={50}>
			{
				chatmsgs.map((v,i)=>{
					const avatar = require(`../img/${users[v.from].avatar}.jpg`)
					return v.from==_userid?(
					<List key={'chat'+v._id}>
						<Item
							thumb={avatar}
						>{v.content}</Item>
					</List>
					):(
					<List key={'chat'+v._id}>
						<Item 

						extra={<img src={avatar} />}
						className='chat-me'>{v.content}</Item>
					</List>

					)
				})
			}
			</QueueAnim>
			<div className='stick-footer'>
				<List>
					<InputItem
						placehholder='请输入'
						value = {this.state.text}
						onChange={v=>{
							this.setState({text:v})
						}}
						extra={

								<div>
									<span
										style={{marginRight:15}}
										onClick={()=>{
											this.setState({
												showEmoji:!this.state.showEmoji
											})
											this.fixCarousel()
										}}
									>😃</span>
									<span onClick={()=>this.handleSubmit()} >发送</span>
								</div>
							}
					></InputItem>
				</List>
				{this.state.showEmoji?<Grid 
						data={emoji}
						columnNum={9}
						carouselMaxRow={4}
						isCarousel={true}
						onClick={el=>{
							this.setState({
								text:this.state.text+el.text
							})
							
						}}
					/>:null}
			</div>
			</div>
			)
	}
}
Chat = connect(state=>state,{getMsgList,sendMsg,recvMsg,readMsg})(Chat)
export default Chat