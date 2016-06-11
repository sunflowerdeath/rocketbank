import React from 'react'

import createCssHelper from '../cssHelper'
import cssModule from './styles.scss'
let cssHelper = createCssHelper(cssModule)

class RadioGroup extends React.Component {
	render() {
		let children = React.Children.map(this.props.children, (elem) => {
			if (elem.type === RadioButton) {
				return React.cloneElement(elem, {
					name: this.props.name,
					selected: this.props.value && elem.props.value === this.props.value
				})
			} else {
				return elem
			}
		})
		return <div className={cssHelper('radioGroup')}>{children}</div>
	}
}

function RadioButton(props) {
	return (
		<label className={cssHelper('radioButton')}>
			<input
				className={cssHelper('radioButton', 'input')}
				type='radio'
				name='name'
				value={props.value}
			/>
			<div className={cssHelper('radioButton', 'circle')}/>
			{props.children}
		</label>
	)
}

export {RadioGroup, RadioButton}
