({
	baseUrl: "../src",
	name: "fractal",
	skipModuleInsertion: true,
	include: [
		"core/utils/Core",
		"core/utils/ArrayUtils",
		"core/controllers/BaseController",
		"core/views/BaseView",
		"core/uis/BaseUI",
		"core/mixins/Native",
		"core/Events",
		"config"
	],
	out:'../compiled/fractal.core.min.js'
})