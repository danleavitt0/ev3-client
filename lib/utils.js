import _ from 'lodash'

export const merge = (...args) => {
	args = args.map((arg) => {
		return arg ? arg : {}
	})
	return _.merge(...args)
}