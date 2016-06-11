import formatBemClassNames from './formatBemClassNames.js'

/**
 * It takes list of class names and CSS-modules, and finds all renamed classes.
 * @param classNames {array.<String>} - List of original class names.
 * @param cssModules {object|array} - CSS-module or an array of modules.
 * @return {array.<String>} - List of renamed class names.
 */
function getRenamedClassNames(classNames, cssModules) {
	if (!Array.isArray(cssModules)) cssModules = [cssModules]

	let result = []
	for (let cls of classNames) {
		for (let mod of cssModules) {
			if (mod[cls]) result.push(mod[cls])
		}
	}
	return result
}

class CssHelper {
	constructor(cssModules) {
		this.cssModules = cssModules
	}

	makeClassName(...args) {
		let classNames = formatBemClassNames(...args)
		return getRenamedClassNames(classNames, this.cssModules).join(' ')
	}
}

export default function createClassNamesHelper(cssModules) {
	let helper = new CssHelper(cssModules)
	return helper.makeClassName.bind(helper)
}
