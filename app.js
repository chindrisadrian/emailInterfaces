requirejs.config({
    baseUrl: 'assets/js/',
    paths: {
        app: '../',
        'text': 'vendor/require.text'
    }
});

requirejs(['main']);