import Formsy from 'react-formsy'

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

