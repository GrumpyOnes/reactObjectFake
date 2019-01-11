import React from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
class NavLinkBar extends React.Component{
	static propTypes={
		data:PropTypes.array.isRequired
	}
	render(){
		const navList=this.props.data.filter(v=>!v.hide)
		const {pathname} = this.props.location
		return (
			<TabBar>
				{
					navList.map(v=>(
						<TabBar.Item
							badge={v.path=='/msg'?this.props.unread:0}
							key={v.text}
							title={v.text}
							icon={{uri:require(`./img/${v.icon}.png`)}}
							selectedIcon={{uri:require(`./img/${v.icon}-select.png`)}}
							selected={pathname==v.path}
							onPress={()=>{
								this.props.history.push(v.path)
							}}
						></TabBar.Item>
						))
				}
			</TabBar>
		)
		
	}
}
NavLinkBar = withRouter(NavLinkBar)
NavLinkBar = connect(state=>state.chat)(NavLinkBar)
export default NavLinkBar