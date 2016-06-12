import React from 'react'
import {Decorator as FormsyField} from 'formsy-react'

import createCssHelper from '../cssHelper'
import cssModule from './styles.scss'
let cssHelper = createCssHelper(cssModule)

@FormsyField()
class RadioGroup extends React.Component {
	componentDidMount() {
		this.setState({value: this.props.value})
	}

	render() {
		let value = this.props.getValue()
		let children = React.Children.map(this.props.children, (elem) => {
			if (elem.type === RadioButton) {
				return React.cloneElement(elem, {
					name: this.props.name,
					selected: elem.props.value === value,
					onChange: () => {
						this.props.setValue(elem.props.value)
					}
				})
			} else {
				return elem
			}
		})
		return <div className={cssHelper('radioGroup')}>{children}</div>
	}
}

class RadioButton extends React.Component {
	render() {
		return (
			<label className={cssHelper('radioButton')}>
				<input
					className={cssHelper('radioButton', 'input')}
					type='radio'
					name={this.props.name}
					onChange={this.onChange.bind(this)}
					checked={this.props.selected}
				/>
				<div className={cssHelper('radioButton', 'circle')}/>
				{this.props.children}
			</label>
		)
	}

	onChange() {
		this.props.onChange()
	}
}

export {RadioGroup, RadioButton}
