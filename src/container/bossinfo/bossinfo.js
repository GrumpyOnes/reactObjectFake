import React from 'react'
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile'
import {Redirect} from 'react-router-dom'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {connect } from 'react-redux'
import {update} from '../../redux/user.redux'

class BossInfo extends React.Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	title:'',
	  	company:'',
	  	money:'',
	  	desc:'',
	  	avatar:''
	  };
	}
	onChange(key,val){
		this.setState({
			[key]:val
		})
	}
 	render(){
 		const path = this.props.location.pathname
 		const redirect = this.props.redirectTo
 		return (<div>
 			{path && path !==redirect?<Redirect to={this.props.redirectTo}></Redirect>:null}
 			<NavBar mode='dark' >BOSS完善信息页面</NavBar>
				<AvatarSelector selectAvatar={(imgName)=>{
					this.setState({
						avatar:imgName
					})
				}}></AvatarSelector>
				<InputItem onChange={(v)=>this.onChange('title',v)}>招聘职位</InputItem>
				<InputItem onChange={(v)=>this.onChange('company',v)}>公司名称</InputItem>
				<InputItem onChange={(v)=>this.onChange('money',v)}>薪资</InputItem>
				<TextareaItem onChange={(v)=>this.onChange('desc',v)} title='职位要求' rows={3} autoHeight></TextareaItem>
				<Button type='primary' onClick={(v)=>{
					this.props.update(this.state)
				}}>保存</Button>
 			</div>)
 	}
 }
 BossInfo = connect(state=>state.user,{update})(BossInfo)
 export default BossInfo