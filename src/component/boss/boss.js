import React from 'react'
import axios from 'axios'

import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'

class Boss extends React.Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	data:[]
	  };
	}
	componentDidMount(){
		this.props.getUserList('genius')
	}
	render(){
		console.log(this.props)
		const _ul = this.props.userlist
		return (
			<UserCard userList={this.props.userlist} ></UserCard>
			)
	}
}
Boss = connect(state=>state.chatuser,{getUserList})(Boss)
export default Boss;