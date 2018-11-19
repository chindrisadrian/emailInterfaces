define([
    'text!templates/actions/actions.html',
    'text!templates/email_content/email_content.html',
    'text!templates/emails/emails.html'
], function(actionsTemplate, emailContentTemplate, emailsTemplate) {

    $.getJSON('assets/test.json').done(function (json) {
        initialization(json.inbox.emails);
    });
    var $emailInterfaces = $('.container');

    $emailInterfaces
    .on('load', '.actions', renderActions);

    
    function initialization(emails) {
        emailss = emails;
		render(emails);
        emailContent(emails);
        renderActions();
        renderEmailContent(emails);
	}
    

	function render(emails) {
		var html;
		_.each(emails, function(email) {
			var $emails = $('.emails-items');
			$emails.append(_.template(emailsTemplate)({id: email.id, name: email.name, markRead: email.markRead, date: email.date, subject: email.subject, message:email.message}));	
		});
		
		var title =
		'<div class="total-emails"><span>Total ('+ _.size(emails) +')</span></div>'+
		'<div class="read-emails"><span><i class="fas fa-envelope text-success-2"></i>read ('+ _.size(_.filter(emails, {'markRead' : true})) +')</span></div>'+
		'<div class="unread-emails"><span><i class="fas fa-envelope-open"></i>unread ('+ _.size(_.filter(emails, {'markRead' : false})) +')</span></div>'
		$title = $('.emails .title').append(title);

    }
    
    function renderActions() {
        var $actions = $('.actions');
        $actions.html(_.template(actionsTemplate));
        $('a:not(".title")').click(function (event) {
            $(event.currentTarget).addClass('active').siblings().removeClass('active');
        });
    }
    function renderEmailContent(emails) {
        var $emailContent = $('.email-content');
        $emailContent.html(_.template(emailContentTemplate)({ subject: emails[0].subject, sender: emails[0].sender, time: emails[0].date, addressee: emails[0].name, message: emails[0].message }));
    }

	function emailContent(emails) {
        var $emailContent = $('.email-content');
		$('.item:not(".title")').click(function (event) {
			$(event.currentTarget).addClass('active').siblings().removeClass('active');
			console.log(emails);
			var $id = $(event.currentTarget).data('id');
			var email = _.find(emails, {id: $id});
			console.log($id);
            $emailContent.html(_.template(emailContentTemplate)({ subject: email.subject, sender: email.sender, time: email.date, addressee: email.name, message: email.message }));
		});
	}

	return {
		init: initialization
	}
    
});  