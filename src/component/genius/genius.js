import React from 'react'
import axios from 'axios'

import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'

class Genius extends React.Component{
	componentDidMount(){
		this.props.getUserList('boss')
	}
	render(){
		console.log(this.props)
		
		return (
			<UserCard userList={this.props.userlist} ></UserCard>
			)
	}
}
Genius = connect(state=>state.chatuser,{getUserList})(Genius)
export default Genius;