import React from'react'
import {connect} from 'react-redux'
import {List,Badge} from 'antd-mobile'
class Msg extends React.Component{
	getLast(arr){
		return arr[arr.length-1]
	}
	render(){
		const Item = List.Item
		const Brief = Item.Brief
		console.log(this.props)
		const userid = this.props.user._id
		const msgGroup={}
		this.props.chat.chatmsg.forEach(v=>{
			msgGroup[v.chatid] = msgGroup[v.chatid] || [];
			msgGroup[v.chatid].push(v)
		})
		const chatList = Object.values(msgGroup).sort((a,b)=>{
			const a_last = this.getLast(a).create_time
			const b_last = this.getLast(b).create_time
			return b_last- a_last
		})

		return (<div>
		{
			chatList.map(v=>{ 
				const lastItem = this.getLast(v);
				const targetId = v[0].from ==userid?v[0].to:v[0].from;
				const unreadNum = v.filter(v=>!v.read&& v.to == userid).length;
				return (<List key={lastItem._id}>
					<Item
					extra={<Badge text={unreadNum} ></Badge>}
					thumb={require(`../img/${this.props.chat.users[targetId].avatar}.jpg`)}
					arrow='horizontal'
					onClick={()=>{
						this.props.history.push(`/chat/${targetId}`)
					}}
					>
					{lastItem.content}
					<Brief>{this.props.chat.users[targetId].name}</Brief>

					</Item>
				</List>) }
			)
		}

			</div>)
	}
}

Msg = connect(state=>state)(Msg)
export default Msg;