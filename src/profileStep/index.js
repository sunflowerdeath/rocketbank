import React from 'react'
import Formsy from 'formsy-react'

import SignupStep from '../signup/signupStep.js'
import Form, {FormLabel, FormCell, FormNote, FormButtons} from '../form'
import TextField from '../textField'
import {RadioButton, RadioGroup} from '../radioButtons'
import Button from '../button'

Formsy.addValidationRule('noSpaces', (values, value) => {
	return typeof value === 'string' ? value.match(/^[^\s]*$/) : true
})

Formsy.addValidationRule('cyrillic', (values, value) => {
	return typeof value === 'string' ? value.match(/^[А-Яа-я]*$/) : true
})

Formsy.addValidationRule('phone', (values, value) => {
	return typeof value === 'string' ?
		value.match(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/) :
		true
})

Formsy.addValidationRule('cyrillicOrDigits', (values, value) => {
	return typeof value === 'string' ? value.match(/^[А-Яа-я0-9]*$/) : true
})

let nameFieldProps = {
	validations: {
		maxLength: 50,
		noSpaces: true,
		cyrillic: true
	},
	validationErrors: {
		maxLength: 'Не больше 100 символов',
		noSpaces: 'Давайте без пробелов',
		cyrillic: 'Только русские буквы',
		isDefaultRequiredValue: 'HEY'
	}
}

export default class ProfileStep extends SignupStep {
	static defaultProps = {
		values: {}
	}

	renderContent() {
		return (
			<div>
				<FormCell half={true}>
					<FormLabel>Фамилия</FormLabel>
					<TextField
						name='secondName'
						value={this.props.values.secondName}
						required={true}
						{...nameFieldProps}
					/>
				</FormCell>

				<FormCell half={true}>
					<FormLabel>Имя</FormLabel>
					<TextField
						name='firstName'
						value={this.props.values.firstName}
						required={true}
						{...nameFieldProps}
					/>
				</FormCell>

				<FormCell half={true}>
					<FormLabel>Отчество</FormLabel>
					<TextField
						name='patronymic'
						value={this.props.values.patronymic}
						{...nameFieldProps}
					/>
				</FormCell>

				<FormCell half={true}>
					<FormLabel>Пол</FormLabel>
					<RadioGroup name='gender' value={this.props.values.gender}>
						<RadioButton value='male'>мужской</RadioButton>
						<RadioButton value='female'>женский</RadioButton>
					</RadioGroup>
				</FormCell>

				<FormCell half={true}>
					<FormLabel>Мобильный телефон</FormLabel>
					<TextField
						name='phone'
						value={this.props.values.phone}
						required={true}
						validations='phone'
						validationErrors={{
							phone: 'Неправильный номер'
						}}
						mask={{
							mask: '+7 (111) 111-11-11',
							placeholder:  '+7 (000) 000-00-00',
							placeholderChar: '\u2007'
						}}
					/>
				</FormCell>

				<FormCell half={true}>
					<FormLabel>Электронная почта</FormLabel>
					<TextField
						name='email'
						value={this.props.values.email}
						required={true}
						validations='isEmail'
						validationErrors={{
							isEmail: 'Ошибка в адресе эл. почты'
						}}
					/>
				</FormCell>

				<FormCell>
					<FormLabel>Кодовое слово</FormLabel>
					<TextField
						arrow={true}
						name='codeword'
						value={this.props.values.codeword}
						required={true}
						validations='cyrillicOrDigits'
						validationErrors={{
							cyrillicOrDigits: 'Только русские буквы и цифры'
						}}
					/>
				</FormCell>

				<FormNote>
					Кодовое слово — слово, которое необходимо при смене пароля,
					звонке в банк или изменении номера телефона.
				</FormNote>

				<FormButtons pos='right'>
					<Button type='submit'>Далее</Button>
				</FormButtons>
			</div>
		)
	}
}
