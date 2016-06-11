import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {Decorator as FormsyField} from 'formsy-react'
import MaskedInput from 'react-maskedinput'

import createCssHelper from '../cssHelper'
import cssModule from './styles.scss'
let cssHelper = createCssHelper(cssModule)

function transitionNameHelper(cssModule, className) {
	return {
		enter: cssModule[className + '-enter'],
		enterActive: cssModule[className + '-enter-active'],
		leave: cssModule[className + '-leave'],
		leaveActive: cssModule[className + '-leave-active']
	}
}

@FormsyField()
export default class TextField extends React.Component {
	static defaultProps = {
		requiredError: 'Заполните поле'
	}

	state = {}

	componentWillReceiveProps() {
		// Valid mark shows only after blur, but is removed instantly
		let isValid = this.props.isValid()
		if (this.prevIsValid !== isValid) {
			this.prevIsValid = isValid
			if (isValid) {
				this.needShowValidMarkOnBlur = true
			} else {
				this.setState({showValidMark: false})
				this.needShowValidMarkOnBlur = false
			}
		}
	}

	render() {
		let error
		let requiredError = this.props.isFormSubmitted() && this.props.showRequired()
		let validationError = this.props.showError()
		if (requiredError || validationError) {
			let message
			if (requiredError) message = this.props.requiredError
			else if (validationError) message = this.props.getErrorMessage()
			error = (
				<div className={cssHelper('textField', 'error')}>
					{message}
				</div>
			)
		}

		let input = this.renderInput()

		let validMark
		if (this.state.showValidMark) {
			validMark = <div className={cssHelper('textField', 'validMark')}/>
		}

		let arrow
		if (this.props.arrow) {
			arrow = <div className={cssHelper('textField', 'arrow')}/>
		}

		return (
			<div className={cssHelper('textField')}>
				<div className={cssHelper('textField', 'inputContainer')}>
					{input}
					{arrow}
					<div className={cssHelper('textField', 'validMarkContainer')}>
						<ReactCSSTransitionGroup
							transitionName={transitionNameHelper(cssModule, 'textField__validMark')}
						>
							{validMark}
						</ReactCSSTransitionGroup>
					</div>
				</div>
				<ReactCSSTransitionGroup
					transitionName={transitionNameHelper(cssModule, 'textField__error')}
				>
					{error}
				</ReactCSSTransitionGroup>
			</div>
		)
	}

	renderInput() {
		let props = {
			className: cssHelper('textField', 'input', {
				invalid: this.props.showError(),
				disabled: this.props.disabled
			}),
			value: this.props.getValue(),
			onChange: (e) => this.props.setValue(e.target.value),
			onBlur: this.onBlur.bind(this)
		}

		let elemType
		if (this.props.mask) {
			elemType = MaskedInput
			Object.assign(props, this.props.mask)
		} else {
			elemType = 'input'
		}

		return React.createElement(elemType, props)
	}

	onBlur() {
		if (this.needShowValidMarkOnBlur) this.setState({showValidMark: true})
	}
}
