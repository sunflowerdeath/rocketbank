import React from 'react'
import ReactDOM from 'react-dom'

import {Router, useRouterHistory} from 'react-router'
import createHistory from 'history/lib/createHashHistory'
import withScroll from 'scroll-behavior';

import './page/styles.scss'
import './fonts/styles.scss'

import Signup from './signup'

let history = withScroll(useRouterHistory(createHistory)({queryKey: false}))
let container = document.querySelector('.container')

ReactDOM.render(
	<Router
		children={{
			path: '/',
			indexRoute: {
				onEnter: (nextState, replace) => { replace('/1') }
			},
			childRoutes: [
				{
					path: ':step',
					component: Signup
				}
			]
		}}
		history={history}
	/>,
	container
)
