import React from 'react'

import SignupStep from '../signup/signupStep.js'
import Form, {FormLabel, FormCell, FormNote, FormButtons} from '../form'
import {RadioButton, RadioGroup} from '../radioButtons'
import TextField from '../textField'
import Link from '../link'
import Button from '../button'

Formsy.addValidationRule('date', (values, value) => {
	return typeof value === 'string' ? value.match(/^\d{2}\.\d{2}\.\d{4}$/) : true
})

export default class PassportStep extends SignupStep {
	constructor(props) {
		super()
		this.state = {
			hasCitizenship: props.values.hasCitizenship
		}
	}

	render() {
		let form = super.render()
		return React.cloneElement(form, {
			onChange: ({hasCitizenship}) => {
				this.setState({hasCitizenship})
			}
		})
	}

	renderContent() {
		return (
			<div>
				<FormCell>
					<FormLabel>Гражданство</FormLabel>
					<RadioGroup name='hasCitizenship' value={this.props.values.hasCitizenship}>
						<RadioButton value='yes'>Гражданство РФ</RadioButton>
						<RadioButton value='no'>Нет гражданства РФ</RadioButton>
					</RadioGroup>
				</FormCell>

				{this.state.hasCitizenship === 'yes' ?
					this.renderOptionalFields() :
					<div style={{height: 376}}/>
				}

				<FormButtons topPadding={true}>
					<Link onClick={this.goBack.bind(this)}>← Назад</Link>
				</FormButtons>

				<FormButtons pos='right'>
					<Button type='submit'>Далее</Button>
				</FormButtons>
			</div>
		)
	}

	renderOptionalFields() {
		return (
			<div>
				<FormCell size='small'>
					<FormLabel>Серия</FormLabel>
					<TextField
						name='series'
						value={this.props.values.series}
						required={true}
						validations={{
							matchRegexp: /\d{4}/,
						}}
						validationErrors={{
							matchRegexp: '4 цифры'
						}}
						mask={{
							mask: '1111',
							placeholder: '0000',
							placeholderChar: '\u2007'
						}}
					/>
				</FormCell>

				<FormCell size='medium'>
					<FormLabel>Номер</FormLabel>
					<TextField
						name='number'
						value={this.props.values.number}
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
					<FormLabel>Кем выдан (прямо как в паспорте)</FormLabel>
					<TextField
						name='issuer'
						value={this.props.values.issuer}
						required={true}
					/>
				</FormCell>

				<FormCell size='medium'>
					<FormLabel>Дата выдачи</FormLabel>
					<TextField
						name='issuedDate'
						value={this.props.values.issuedDate}
						required={true}
						validations='date'
						validationErrors={{
							date: 'Неправильная дата'
						}}
						mask={{
							mask: '11.11.1111',
							placeholder: '31.12.2000',
							placeholderChar: '\u2007'
						}}
					/>
				</FormCell>

				<FormCell size='medium'>
					<FormLabel>Код подразделения</FormLabel>
					<TextField
						name='departmentCode'
						value={this.props.values.departmentCode}
						required={true}
						validations={{
							matchRegexp: /\d{3}\-\d{3}/,
						}}
						validationErrors={{
							matchRegexp: 'Неполный код'
						}}
						mask={{
							mask: '111-111',
							placeholder: '000-000',
							placeholderChar: '\u2007'
						}}
					/>
				</FormCell>

				<br/>

				<FormCell size='medium'>
					<FormLabel>Дата рождения</FormLabel>
					<TextField
						name='birthDate'
						value={this.props.values.birthDate}
						required={true}
						validations='date'
						validationErrors={{
							date: 'Неправильная дата'
						}}
						mask={{
							mask: '11.11.1111',
							placeholder: '31.12.2000',
							placeholderChar: '\u2007'
						}}
					/>
				</FormCell>

				<FormCell size='medium' style={{width: 330, marginRight: 0}}>
					<FormLabel>Место рождения</FormLabel>
					<TextField
						name='birthPlace'
						value={this.props.values.birthPlace}
						required={true}
					/>
				</FormCell>
			</div>
		)
	}
}
