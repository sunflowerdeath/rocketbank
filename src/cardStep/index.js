import React from 'react'

import SignupStep from '../signup/signupStep.js'
import {FormButtons} from '../form'
import Link from '../link'
import Button from '../button'

export default class CardStep extends SignupStep {
	renderContent() {
		return (
			<div>
				<div style={{
					height: 225, width: 400,
					background: '#ccc', borderRadius: 10,
					margin: '70px auto'
				}}/>

				<FormButtons topPadding={true}>
					<Link onClick={this.goBack.bind(this)}>← Назад</Link>
				</FormButtons>

				<FormButtons pos='right'>
					<Button type='submit'>Готово</Button>
				</FormButtons>
			</div>
		)
	}
}
