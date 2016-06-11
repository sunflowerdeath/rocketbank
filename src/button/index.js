import React from 'react'

import createCssHelper from '../cssHelper'
import cssModule from './styles.scss'
let cssHelper = createCssHelper(cssModule)

export default class Button extends React.Component {
	static defaultProps = {
		elemType: 'button'
	}

	render() {
		let {elemType, ...restProps} = this.props
		return React.createElement(elemType, {
			className: cssHelper('button'),
			...restProps
		}, this.props.children)
	}
}
