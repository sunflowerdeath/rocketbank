import React from 'react'

import createCssHelper from '../cssHelper'
import cssModule from './styles.scss'
let cssHelper = createCssHelper(cssModule)

function Form(props) {
	return <div className={cssHelper('form')}>{props.children}</div>
}

function FormLabel(props) {
	return <div className={cssHelper('form', 'label')}>{props.children}</div>
}

function FormNote(props) {
	return <div className={cssHelper('form', 'note')}>{props.children}</div>
}

function FormButtons(props) {
	return <div className={cssHelper('form', 'buttons', {pos:props.pos})}>
		{props.children}
	</div>
}
FormButtons.defaultProps = {pos: 'left'}

function FormCell(props) {
	return (
		<div className={cssHelper('form', 'cell', {half: props.half})}>
			{props.children}
		</div>
	)
}

export default Form
export {FormLabel, FormNote, FormButtons, FormCell}
