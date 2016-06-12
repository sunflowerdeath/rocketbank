import React from 'react'

import Logo from '../logo'
import ProfileStep from '../profileStep'
import PassportStep from '../passportStep'
import AddressStep from '../addressStep'
import CardStep from '../cardStep'

import createCssHelper from '../cssHelper'
import cssModule from './styles.scss'
let cssHelper = createCssHelper(cssModule)

export default class Signup extends React.Component {
	static contextTypes = {
		router: React.PropTypes.object
	}

	state = {
		steps: [
			{
				key: 'profile',
				name: 'Профиль',
				component: ProfileStep,
				values: {
					gender: 'male'
				}
			},
			{
				key: 'passport',
				name: 'Паспорт',
				component: PassportStep,
				values: {
					hasCitizenship: 'yes'
				}
			},
			{
				key: 'address',
				name: 'Адрес регистрации',
				component: AddressStep
			},
			{
				key: 'card',
				name: 'Карта',
				component: CardStep
			}
		]
	}

	componentWillMount() {
		this.redirectIfPrevStepsInvalid(this.props.params.step)
	}

	componentDidMount() {
		this.context.router.setRouteLeaveHook(this.props.route, this.routerWillLeave.bind(this))
    }

	componentWillReceiveProps(nextProps) {
		this.redirectIfPrevStepsInvalid(nextProps.params.step)
	}

	redirectIfPrevStepsInvalid(step) {
		let index = Number(step) - 1
		let redirectUrl
		for (let i = 0; i < index; i++) {
			if (!this.state.steps[i].isValid) {
				redirectUrl = '/' + (i + 1)
				break;
			}
		}
		if (redirectUrl) this.context.router.push(redirectUrl)
	}

    routerWillLeave(nextLocation) {
		this.saveCurrensStepState()
	}

	saveCurrensStepState(callback) {
		let index = Number(this.props.params.step) - 1
		let step = {
			...this.state.steps[index],
			values: this.formRef.getValues(),
			isValid: this.formRef.isValid()
		}
		this.setState({
			steps: [
				...this.state.steps.slice(0, index),
				step,
				...this.state.steps.slice(index + 1)
			]
		}, callback)
    }

	render() {
		return <div className={cssHelper('signup')}>
			{this.renderHeader()}

			<div className={cssHelper('signup', 'container')}>
				<div className={cssHelper('signup', 'leftCol')}>
					<h1 className={cssHelper('signup', 'h1')}>
						Заявка на открытие дебетовой карты
					</h1>

					{this.renderSteps()}

					<div className={cssHelper('signup', 'note')}>
						Доставляем карты бесплатно по Москве, Санкт‑Петербургу, Екатеринбургу,
						Самаре, Тольятти, Нижнему Новгороду, Казани и Новосибирску
					</div>
				</div>

				<div className={cssHelper('signup', 'rightCol')}>
					{this.renderForm()}
				</div>

				{this.renderFooter()}
			</div>
		</div>
	}

	renderHeader() {
		return (
			<div className={cssHelper('signup', 'header')}>
				<div className={cssHelper('signup', 'logo')}>
					<Logo/>
				</div>
			</div>
		)
	}

	renderFooter() {
		return (
			<div className={cssHelper('signup', 'footer')}>
				<p className={cssHelper('signup', 'footerNote')}>
					Указывая свои персональные данные в полях заявки, вы соглашаетесь на
					{' '}
					<a href='/open-rules#privacy' target='_blank' style={{color: '#948f8b'}}>
						их обработку</a>.
				</p>
				<p className={cssHelper('signup', 'footerNote')}>
					ПАО «Ханты‑Мансийский банк Открытие». www.openbank.ru
					Генеральная лицензия Банка России №1971 от&nbsp;05.11.2014.
					Филиал «Бизнес онлайн».
				</p>
			</div>
		)
	}

	renderSteps() {
		let steps = []
		for (var i in this.state.steps) {
			let step = this.state.steps[i]
			steps.push(
				<h2 className={cssHelper('signup', 'stepTitle', {
					completed: step.isValid,
					active: Number(i) + 1 == this.props.params.step
				})}>
					{step.name}
				</h2>
			)
		}

		return <div className={cssHelper('signup', 'steps')}>{steps}</div>
	}

	renderForm() {
		let step = this.state.steps[Number(this.props.params.step) - 1]
		return React.createElement(step.component, {
			ref: (ref) => { this.formRef = ref },
			values: step.values,
			onComplete: this.completeStep.bind(this),
			onGoBack: this.goBack.bind(this)
		})
	}

	completeStep() {
		let index = Number(this.props.params.step)
		if (index === this.state.steps.length) {
			this.completeSignup()
		} else {
			this.saveCurrensStepState(() => {
				this.context.router.push('/' + (index + 1))
			})
		}
	}

	goBack() {
		this.saveCurrensStepState(() => {
			let index = Number(this.props.params.step)
			this.context.router.push('/' + (index - 1))
		})
	}

	completeSignup() {
		let data = {}
		this.state.steps.forEach((step) => { data[step.key] = step.values })
		alert('Готово')
		console.log(data)
	}
}
