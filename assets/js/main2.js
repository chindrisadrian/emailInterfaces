var emails;
$.getJSON('test.json').done(function (json) {
	renderEmails.init(json.inbox);
	// console.log(json);
});

var renderEmails = (function() {
	function initialization(inbox) {
		render(inbox);
		emailContent(inbox);
		
		textTemplate: _.template( $('#email_content').load('templates/email_content.html') ),
	console.log(textTemplate);

	}

	function render(inbox) {
		var html;
		_.each(inbox.emails, function(email) {
			html = 
			'<div class="border-bottom item" data-id="'+ email.id +'">'+
				'<div class="d-flex justify-content-between">'+
					'<h4 class="name">'+ email.name +'</h4>'+
					'<div class="hour"><span><i class="'+ (email.markRead ? 'fas fa-envelope-open' : 'fas fa-envelope text-success-2') +'"></i>'+ email.date +'</span></div>' +
				'</div>'+
				'<h6 class="subject">'+ email.subject +'</h6>'+
				'<div class="message">'+ email.message +'</div>'+
			'</div>'
			$('.emails .emails-items').append(html)
		});
		
		var title =
		'<div class="total-emails"><span>Total ('+ _.size(inbox.emails) +')</span></div>'+
		'<div class="read-emails"><span><i class="fas fa-envelope text-success-2"></i>read ('+ _.size(_.filter(inbox.emails, {'markRead' : true})) +')</span></div>'+
		'<div class="unread-emails"><span><i class="fas fa-envelope-open"></i>unread ('+ _.size(_.filter(inbox.emails, {'markRead' : false})) +')</span></div>'
		$title = $('.emails .title').append(title);

	}

	function emailContent(inbox) {
		$('.item:not(".title")').click(function (event) {
			$(event.currentTarget).addClass('active').siblings().removeClass('active');
			console.log($(event.currentTarget).data('id'))
			var email = _.find(inbox.emails, {id: $(event.currentTarget).data('id')});
			console.log(email);
			var $emailContent = $('.email-content');
			$emailContent.find('.subject').html('<strong>Subject: '+ email.subject +'</strong>');
			$emailContent.find('.email-details .sender').html('Sender: <strong>'+ email.sender +'</strong>');
			$emailContent.find('.email-details .time').html('Time: ' + email.date);
			$emailContent.find('.email-details .addressee').html('Addressee: <strong>' + email.name + '</strong>');
			$emailContent.find('.email-message').html(email.message);
			email.markRead = true;
			// render(inbox);
		});
	}

	return {
		init: initialization
	}
})();








$('a:not(".title")').click(function (event) {
	$(event.currentTarget).addClass('active').siblings().removeClass('active');
});



