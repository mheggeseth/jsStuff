//{
//	widget: name of the jQueryUI widget,
//	options: options object for the jQueryUI widget,
//	refreshOn: if options has no observables, trigger the widget's 'refresh' method with this object
//}
ko.bindingHandlers.jqueryui = {
	init: function (element, valueAccessor, allBindings, viewModel)
	{
		var boundValue = ko.toJS(valueAccessor());
		var widget = boundValue['widget'];
		var options = boundValue['options'];
		var $element = $(element);
		if (typeof $element[widget] == 'function')
		{
			$element[widget](options);
			//handle disposal (if KO removes by the template binding)
			ko.utils.domNodeDisposal.addDisposeCallback(element, function ()
			{
				$element[widget]("destroy");
			});
		}
	},
	update: function (element, valueAccessor, allBindings, viewModel)
	{
		var boundValue = ko.toJS(valueAccessor());
		var widget = boundValue['widget'];
		var options = boundValue['options'];
		var $element = $(element);
		if (typeof $element[widget] == 'function')
		{
			if (boundValue.refreshOn)
			{
				$element[widget]('refresh');
			}
			if (options)
			{
				$element[widget]('option', options);
			}
		}
	}
};