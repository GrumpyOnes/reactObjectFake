import React from 'react'
import {Grid,List} from 'antd-mobile'
import PropTypes from 'prop-types'
class AvatarSelector extends React.Component{
	static propTypes={
		selectAvatar:PropTypes.func.isRequried
	}
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	
	  };
	}
 	render(){
 		const avatarList='p1,p2,p3,p4,p5,p6,p7,p8,p9,p10'.split(',').map((v)=>{
			return {
				icon:require(`../img/${v}.jpg`),
				text:v
			}
		})
		const gridHeader = this.state.icon?(<div>
			<span>已选头像</span>
			<img style={{width:'20px'}} src={this.state.icon} alt={this.state.text} />
		</div>):(<div>	请选头像</div>);
 		return (<div>
 			<List renderHeader={()=>gridHeader}></List>
 			<Grid onClick={ele=>{
 				this.setState(ele)
 				this.props.selectAvatar(ele.text)
 			}} data={avatarList} columnNum='5'></Grid>
 			</div>)
 	}
 }
 export default AvatarSelector