const DEFAULT_OPTIONS = {
	elemSeparator: '__',
	modSeparator: '_',
	modValSeparator: '_'
}

class BemFormatter {
	constructor(options) {
		this.options = Object.assign({}, DEFAULT_OPTIONS, options)
	}

	/**
	 * @param block {string} - Block name.
	 * @param [elem] {string} - Element name.
	 * @param [mods] {object} - Modifiers.
	 *
	 * @return {array.<string>} List of class names.
	 */
	format(block, elem, mods) {
		if (typeof elem === 'object') {
			mods = elem
			elem = false
		}

		let base = block
		if (elem) base += this.options.elemSeparator + elem

		let result = [base]
		for (let modName in mods) {
			let modVal = mods[modName]
			let modCls = this.formatMod(base, modName, modVal)
			if (modCls) result.push(modCls)
		}

		return result
	}

	formatMod(baseCls, modName, modVal) {
		if (modVal === false || typeof modVal === 'undefined') return

		let result = baseCls + this.options.modSeparator + modName
		if (modVal !== true) result += this.options.modValSeparator + String(modVal)

		return result
	}
}

function createFormatter(options) {
	var formatter = new BemFormatter(options)
	return formatter.format.bind(formatter)
}

export default createFormatter()
export {createFormatter}
