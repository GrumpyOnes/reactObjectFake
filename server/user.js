const express =require('express');
const Router = express.Router()
const models= require('./model')
const utils = require('utility')
const _filter ={pwd:0,'__v':0}

const User = models.getModel('user');
const Chat = models.getModel('chat');
//清空
//Chat.remove({},function(e,d){})
Router.get('/list',function(req,res){
	const {type}=req.query;
	User.find({type},function(err,doc){
		return res.json({code:0,data:doc})
	})
})
Router.get('/getmsglist',function(req,res){

	const userid = req.cookies.userid
	User.find({},function(e,userdoc){

		let users = {}
		userdoc.forEach(v=>{
			users[v._id]={name:v.user,avatar:v.avatar}
		})

		Chat.find({'$or':[{from:userid},{to:userid}]},function(err,doc){
			if(!err){
				return res.json({code:0,data:doc,user:users})
			}
		})
	})
	
})
Router.post('/readmsg',function(req,res){
	const userid = req.cookies.userid
	const {from} = req.body
	Chat.update(
		{from,to:userid},
		{'$set':{read:true}},
		{'multi':true},function(err,docs){
		console.log(docs)
		if(!err){
			return res.json({code:0,num:docs.nModified})
		}
		return res.json({code:1,msg:'修改失败'})
	})
})
Router.post('/update',function(req,res){
	const userid = req.cookies.userid
	if(!userid){
		return res.json({code:1})
	}
	const body = req.body
	User.findByIdAndUpdate(userid,body,function(err,doc){
		const data = Object.assign({},{
			user:doc.user,
			type:doc.type
		},body)
		return res.json({code:0,data})
	})
})
Router.post('/login',function(req,res){
	const {user,pwd} =req.body;
	User.findOne({user:user,pwd:md5pwd(pwd)},_filter,function(err,doc){
		if(err){
			return res.json({code:1,msg:'查询出错'})
		}
		if(doc && doc.user){
			res.cookie('userid',doc._id)
			return res.json({code:0,data:doc})
		}
		return res.json({code:1,msg:'用户名密码错误'})
	})
})
Router.post('/register',function(req,res){
	const {user,pwd,type} = req.body;
	User.findOne({user:user},function(err,doc){
		if(doc){
			return res.json({code:1,msg:'用户名重复'})
		}
		const userModel = new User({user,type,pwd:md5pwd(pwd)})
		userModel.save(function(e,d){
			if(e){
				return res.json({code:1,msg:'后端出错'})
			}
			const {user,type,_id}=d;
			res.cookie('userid',_id)
			return res.json({code:0,data:{user,type,_id}})
		})
	// 	User.create({user,pwd:md5pwd(pwd),type},function(err,doc){
	// 	if(err){
	// 		return res.json({code:1,msg:'创建出错'})
	// 	}
	// 	return res.json({code:0})
	// })
		
	})
	
})
//加盐
function md5pwd(pwd){
	const salt = "imooc_is_good_33532523";
	return utils.md5(utils.md5(salt+pwd))
}
Router.get('/info',function(req,res){
	const {userid} = req.cookies
	if(!userid){
		return res.json({code:1})
	}
	User.findOne({_id:userid},_filter,function(err,doc){
		if(err){
			return res.json({code:1,msg:'后端出错'})
		}else{
			return res.json({code:0,data:doc})
		}
	})

})
module.exports = Router;