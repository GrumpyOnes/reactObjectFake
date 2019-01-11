import  express from 'express';
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const models= require('./model')
const User = models.getModel('user');

import csshook from "css-modules-require-hook/preset"
import assethook from 'asset-require-hook'
assethook({
	extensions:['png','jpg','svg']
})
import React from "react"
import {createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {StaticRouter} from 'react-router-dom'
import App from '../src/App'
import {renderToString,renderToStaticMarkup} from 'react-dom/server'
import reducers from '../src/reducer'

import staticPath from '../build/asset-manifest.json'

const Chat = models.getModel('chat');
const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server)
const path = require('path')
io.on('connection',function(socket){
	//console.log('user log')
	socket.on('sendmsg',function(data){
		const {from,to,msg} = data
		const chatid = [from,to].sort().join("_")
		Chat.create({chatid,from,to,content:msg},function(err,doc){
			io.emit('recvmsg',Object.assign({},doc._doc))
		})
	})
})

const userRouter = require('./user')



console.log('********',process.env.NODE_ENV)


app.use(cookieParser());
app.use(bodyParser.json())
app.use('/user',userRouter);
app.use(function(req,res,next){
	if(req.url.startsWith('/user/') || req.url.startsWith('/static/')){
		return next()
	}
	const store = createStore(reducers,compose(
		applyMiddleware(thunk)
		)
	);
	let context = {}

	const markup = renderToString((
		<Provider store={store}>
		< StaticRouter
			location={req.url}
			context={context}
		>
		<App></App>
		</StaticRouter>
	</Provider>
	))
	const obj={
		'/msg':'xinxi',
		'/boss':'laoban'
	}
	const html =`<!DOCTYPE html>
	<html lang="en">
	  <head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta name="theme-color" content="#000000">
		<meta name='keywords' content="" />
		<meta name='description' content="${obj[req.url]}" />
		<title>React App</title>
		<link rel="stylesheet" href="${staticPath['main.css']}" />
	  </head>
	  <body>

		<div id="root">${markup}</div>
		<script src="${staticPath['main.js']}"></script>
	  </body>
	</html>
	`

	res.send(html);
	//const htmlRes = renderToString(<App></App>)
	//res.send(htmlRes)
	//return res.sendFile(path.resolve('build/index.html'))
})
app.use('/',express.static(path.resolve('build')))
//app.listen
server.listen(9093,function(){
	console.log('node app start')
})