import axios from 'axios'
import {getRedirectPath} from '../component/util/util'
//const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const AUTH_SUCCESS='AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOG_OUT = 'LOG_OUT'
//const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOAD_DATA = 'LOAD_DATA'
const initState ={
	redirectTo:'',
	type:'',
	user:'',
	pwd:'',
	msg:'',
	//isAuth:false
}
export function user(state=initState,action){
	switch (action.type){
		/*case REGISTER_SUCCESS:
			return {...state,msg:'',redirectTo:getRedirectPath(action.payload),isAuth:true,...action.payload}
		case LOGIN_SUCCESS:
			return {...state,msg:'',redirectTo:getRedirectPath(action.payload),isAuth:true,...action.payload}
		*/
		case AUTH_SUCCESS:
	    return {...state,msg:'',redirectTo:getRedirectPath(action.payload),...action.payload}
		case LOAD_DATA:
		return {...state,...action.payload}
		case LOG_OUT:
		return {...initState,redirectTo:'/login'}
		case ERROR_MSG:
		return {...state,isAuth:false,msg:action.msg}
		default:
			return state
	}
	return false
}
function authSuccess(obj){
	const {pwd,...data} = obj
	return {type:AUTH_SUCCESS,payload:data}
}
/*export function registerSuccess(data){
	return {type:REGISTER_SUCCESS,payload:data.data}
}
export function loginSucess(data){
	return {type:LOGIN_SUCCESS,payload:data.data}
}*/
export function errorMsg(msg){
	return {msg,type:ERROR_MSG}
}
export function loadData(userinfo){
	return {payload:userinfo,type:LOAD_DATA}
}
export function update(data){
	return dispatch=>{
		axios.post('/user/update',data)
			.then(res=>{
				if(res.status==200&&res.data.code===0){
					dispatch(authSuccess(res.data.data))
				}else{
					dispatch(errorMsg(res.data.msg))
				}
			})

		}
	}
export function logoutSubmit(){
	return {type:LOG_OUT}
}
export function login({user,pwd}){
	if(!user || !pwd){
		return errorMsg('用户名密码必须输入')
	}
	return dispatch=>{
		axios.post('/user/login',{user,pwd}).then(
		res=>{
			if(res.status==200 && res.data.code==0){
				dispatch(authSuccess(res.data.data))
			}else{
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}
export function register({user,pwd,repeatpwd,type}){
	if(!user || !pwd || !repeatpwd){
		return errorMsg('用户密码必须输入')
	}if(pwd!==repeatpwd){
		return errorMsg('确认密码必须与密码一样')
	}
	return dispatch=>{
		axios.post('/user/register',{user,pwd,type}).then(
		res=>{
			if(res.status==200 && res.data.code==0){
				dispatch(authSuccess(res.data.data));
			}else{
				dispatch(errorMsg(res.data.msg));
			}
		}
		)
	}
	
}