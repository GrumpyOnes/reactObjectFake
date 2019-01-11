import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom'

import Dashboard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import BossInfo from './container/bossinfo/bossinfo'
import Login from './container/login/login'
import Register from './container/register/register'
import './config'
import AuthRoute from './component/authroute/authRoute'

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      hasError:false
    }
  }
  componentDidCatch(err,info){
    this.setState({hasError:true})
  }
  render() {
    return this.state.hasError?<h2>页面出错了</h2>:(
      <div>
			<AuthRoute></AuthRoute>
			<Switch>
			<Route path='/geniusinfo' component={GeniusInfo} ></Route>
			<Route path='/bossinfo' component={BossInfo} ></Route>
			<Route path='/login' component={Login} ></Route>
			<Route path='/register' component={Register} ></Route>
			<Route path='/chat/:user' component={Chat} ></Route>
			<Route component ={Dashboard} ></Route>
			</Switch>
		</div>
    );
  }
}

export default App;
