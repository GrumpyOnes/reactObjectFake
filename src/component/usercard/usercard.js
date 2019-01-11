import React from 'react'
import PropTypes from 'prop-types'
import {Card,WhiteSpace,WingBlank} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
class UserCard extends React.Component{
	static propTypes ={
		userlist:PropTypes.array.isRequired
	}
	handleClick(v){
		this.props.history.push(`/chat/${v._id}`)
	}
	render(){
		return(
			<WingBlank>
			{this.props.userList.map(v=>(
				v.avatar?(<Card key={v.user}
						onClick={()=>this.handleClick(v)}
					>
					<Card.Header
					title={v.user}
					thumb={require(`../img/${v.avatar}.jpg`)}
					extra={<span>{v.title}</span>}
					/>
					<Card.Body>
					{v.type=='compeny'?<div>公司{v.compeny}</div>:null}
						<div>简介
						{v.desc.split('\n').map(v=>(
							<p key={v}>{v}</p>
							))}
						</div>
						{v.type=='boss'?<div>薪资{v.money}</div>:null}
					</Card.Body>
				</Card>):null
				))}
			</WingBlank>
		)
	}
}
UserCard = withRouter(UserCard)
export default UserCard