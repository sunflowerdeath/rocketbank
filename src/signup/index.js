import React from 'react'

import Profile from '../profile'
import Logo from '../logo'
import ProfileForm from '../profile'
import PassportForm from '../passportForm'
import AddressForm from '../addressForm'

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
				name: 'Профиль',
				component: ProfileForm
			},
			{
				name: 'Паспорт',
				component: PassportForm
			},
			{
				name: 'Адрес регистрации',
				component: AddressForm
			},
			{
				name: 'Карта',
				component: PassportForm
			}
		]
	}

	componentDidMount() {
		this.context.router.setRouteLeaveHook(this.props.route, this.routerWillLeave.bind(this))
    }

    routerWillLeave(nextLocation) {
		// save current step
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
		})
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
					Генеральная лицензия Банка России №1971 от&nbsp;05.11.2014. Филиал «Бизнес онлайн».
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
			onComplete: () => {
				let index = Number(this.props.params.step) + 1
				this.context.router.push('/' + index)
			},
			onGoBack: () => {
				let index = Number(this.props.params.step) - 1
				this.context.router.push('/' + index)
				console.log('URL', '/' + index)
			}
		})
	}
}
