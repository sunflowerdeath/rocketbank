import React from 'react'

import SignupStep from '../signup/signupStep.js'
import Form, {FormLabel, FormCell, FormNote, FormButtons} from '../form'
import TextField from '../textField'
import Button from '../button'

export default class AdressForm extends SignupStep {
	renderContent() {
		return (
			<div>
				<FormCell half={true}>
					<FormLabel>Город</FormLabel>
					<TextField
						name='city'
						required={true}
					/>
				</FormCell>

				<br/>

				<FormButtons>
					<a onClick={this.goBack.bind(this)}>Назад</a>
				</FormButtons>

				<FormButtons pos='right'>
					<Button type='submit'>Далее</Button>
				</FormButtons>
			</div>
		)
	}
}
