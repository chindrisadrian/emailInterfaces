	$('a:not(".title")').click(function (event) {
		$(event.currentTarget).addClass('active').siblings().removeClass('active');
	});