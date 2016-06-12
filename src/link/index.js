import React from 'react'

import createCssHelper from '../cssHelper'
import cssModule from './styles.scss'
let cssHelper = createCssHelper(cssModule)

export default function Link(props) {
	return <span className={cssHelper('link')} {...props}/>
}
