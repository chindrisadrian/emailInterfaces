requirejs.config({
    baseUrl: 'assets',
    paths: {
        app: '../',
        'text': 'js/vendor/text'
    }
});

requirejs(['js/main']);