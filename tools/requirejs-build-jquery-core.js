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
		"core/Events",
		"extras/mixins/jQuery",
		"config"
	],
	out:'../compiled/fractal.jquery-core.min.js'
})