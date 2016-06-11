import React from 'react'

import createCssHelper from '../cssHelper'
import cssModule from './styles.scss'
let cssHelper = createCssHelper(cssModule)

export default function Logo() {
	return (
		<a className={cssHelper('logo')} href='/'>
			<div className={cssHelper('logo', 'img')}/>
			<div className={cssHelper('logo', 'text')}>Рокетбанк</div>
		</a>
	)
}
