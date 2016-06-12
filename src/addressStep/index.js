import React from 'react'

import SignupStep from '../signup/signupStep.js'
import Form, {FormLabel, FormCell, FormNote, FormButtons} from '../form'
import TextField from '../textField'
import Button from '../button'
import Link from '../link'

export default class AdressStep extends SignupStep {
	renderContent() {
		return (
			<div>
				<FormCell size='medium'>
					<FormLabel>Индекc</FormLabel>
					<TextField
						name='index'
						value={this.props.values.index}
						required={true}
						validations={{
							matchRegexp: /\d{6}/,
						}}
						validationErrors={{
							matchRegexp: '6 цифр'
						}}
						mask={{
							mask: '111111',
							placeholder: '000000',
							placeholderChar: '\u2007'
						}}
					/>
				</FormCell>

				<br/>

				<FormCell>
					<FormLabel>Город</FormLabel>
					<TextField name='city' required={true}
						value={this.props.values.city}
					/>
				</FormCell>

				<FormCell>
					<FormLabel>Улица</FormLabel>
					<TextField name='street' required={true}
						value={this.props.values.street}
					/>
				</FormCell>

				<FormCell size='small'>
					<FormLabel>Дом</FormLabel>
					<TextField name='house'
						value={this.props.values.house}
					/>
				</FormCell>

				<FormCell size='small'>
					<FormLabel>Корпус</FormLabel>
					<TextField name='building'
						value={this.props.values.building}
					/>
				</FormCell>

				<FormCell size='small'>
					<FormLabel>Строение</FormLabel>
					<TextField name='construction'
						value={this.props.values.construction}
					/>
				</FormCell>

				<FormCell size='small'>
					<FormLabel>Квартира</FormLabel>
					<TextField name='appartment'
						value={this.props.values.appartment}
					/>
				</FormCell>

				<br/>

				<FormButtons topPadding={true}>
					<Link onClick={this.goBack.bind(this)}>← Назад</Link>
				</FormButtons>

				<FormButtons pos='right'>
					<Button type='submit'>Далее</Button>
				</FormButtons>
			</div>
		)
	}
}
