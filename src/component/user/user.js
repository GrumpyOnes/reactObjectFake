import React from 'react'
import {connect} from 'react-redux'
import {Result,List,Brief,WhiteSpace,Button,Modal} from 'antd-mobile'
import browserCookie from 'browser-cookies'
import {logoutSubmit} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
 class User extends React.Component{
 	constructor(props) {
 	  super(props);
 	
 	  this.state = {};
 	  this.logout = this.logout.bind(this)
 	}
 	logout=()=>{

 		const alert = Modal.alert
 		alert('Delete','确定退出？',[
 			{text:'取消',onPress:()=>{}},
 			{text:'确定',onPress:()=>{
 				browserCookie.erase('userid');
 				console.log('cookies erase')
 				this.props.logoutSubmit();
 			}},
 			])
 		
 		//强制刷新
 		//location.href= location.href;
 	}
 	render(){
 		const props=this.props;
 		console.log(this.props);
 		const Item = List.Item;
 		return props.user?(<div>
 			<Result 
 				img={<img style={{width:'50px'}} src={require(`../img/${this.props.avatar}.jpg`)} />}
 				title={this.props.user}
 				message={props.type=='boss'?props.company:null}
 			/>
 			
 			<List renderHeader={()=>"简介"}>
 				<List.Item>
 				{props.title}
 				<List.Item.Brief>{props.desc}</List.Item.Brief>
 				</List.Item>
 				{props.money?<List.Item><List.Item.Brief>薪资：{props.money}</List.Item.Brief></List.Item>:null}
 			</List>
 			<WhiteSpace></WhiteSpace>
 			<Button onClick={this.logout}>退出登录</Button>
 			</div>):<Redirect to={props.redirectTo}></Redirect>;

 	}
 }
 User = connect(state=>state.user,{logoutSubmit})(User)
 
 export default User;