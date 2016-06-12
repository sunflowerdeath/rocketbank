import React from 'react'
import Formsy from 'formsy-react'

export default class SignupStep extends React.Component {
	static defaultProps = {
		values: {}
	}

	render() {
		return (
			<Formsy.Form
				onChange={this.props.onChange}
				onValidSubmit={this.complete.bind(this)}
				ref={(ref) => { this.formRef = ref }}
			>
				{this.renderContent()}
			</Formsy.Form>
		)
	}

	renderContent() {
		throw new Error('Not implemented')
	}

	complete() {
		if (this.props.onComplete) this.props.onComplete()
	}

	goBack() {
		if (this.props.onGoBack) this.props.onGoBack()
	}

	getValues() {
		return this.formRef.getModel()
	}

	isValid() {
		return this.formRef.state.isValid
	}
}
