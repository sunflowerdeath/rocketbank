export default function transitionNameHelper(cssModule, className) {
	return {
		enter: cssModule[className + '-enter'],
		enterActive: cssModule[className + '-enter-active'],
		leave: cssModule[className + '-leave'],
		leaveActive: cssModule[className + '-leave-active']
	}
}

