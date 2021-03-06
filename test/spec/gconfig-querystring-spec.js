/*global define:true*/
/*global describe:true */
/*global it:true */
/*global expect:true */
/*global beforeEach:true */
/* jshint strict: false */
define(['gconfig', 'gconfig.qstring', 'jquery'], function(GConfig, GConfigQS, $) {
    var html = [
        '<meta http-equiv="X-UA-Compatible" content="IE=edge">',
        '<meta name="description" content="">',
        '<meta name="viewport" content="width=device-width, initial-scale=1">',
        '<meta name="app:name" content="GConfig Tester">',
        '<meta name="app:baseurl" content="http://localhost:9030">',
        '<meta name="app:default-controller" content="Controller">',
        '<meta name="widget:id" content="widgetId">'
    ].join('');

    var meta = {
        app:{
            name: 'GConfig Tester',
            baseurl: 'http://localhost:9030',
            'default-controller': 'Controller'
        },
        widget:{
            id:'widgetId'
        }
    };

    GConfig.extend(GConfigQS);

    describe('GConfigQS plugin...', function() {

        beforeEach(function() {
            $('head').append(html);
        });

        afterEach(function(){
            $('meta').remove();
        });

        it('should have an ID class property', function() {
            expect(GConfigQS.ID).toBeTruthy();
        });

        it('should have an VERSION class property', function() {
            expect(GConfigQS.VERSION).toBeTruthy();
        });

        it('should be tracked by GConfig', function() {
            expect(GConfig.PLUGINS).toHaveProperties(GConfigQS.ID);
            expect(GConfig.PLUGINS[GConfigQS.ID]).toMatch(GConfigQS.VERSION);
        });

        it('GConfig should load metadata', function(){
            var config = new GConfig();
            expect(config.data).toMatchObject(meta);
        });

        it('should have one extra method added by path plugin', function() {
            var config = new GConfig();
            expect(config).toHaveMethods(['toQueryString', 'loadQueryString', 'filterAttributes']);
        });

        it('should turn config data to a valid query string', function() {
            var config = new GConfig();
            var expected = '?app[name]=GConfig+Tester&app[baseurl]=http%3A%2F%2Flocalhost%3A9030&app[default-controller]=Controller&widget[id]=widgetId';
            expect(config.toQueryString()).toEqual(expected);
        });

        it('should load a window query string to a config instance', function() {
            var config = new GConfig(),
                expected = new GConfig(),
                queryString = '?app[name]=GConfig+Tester&app[baseurl]=http%3A%2F%2Flocalhost%3A9030&app[default-controller]=Controller&widget[id]=widgetId';

            expected.data = {};
            expected.loadQueryString(null, queryString);
            expect(config.data).toMatchObject(expected.data);
        });

        it('should have a stub method to filter attributes', function() {
            var config = new GConfig();
            expect(config.filterAttributes(config.data)).toMatchObject(config.data);
        });

        it('we should be able to override the filterAttributes method', function(){
            var expected = {};
            var queryString = '?app[name]=ThisShouldNotBeChanged';
            var config = new GConfig({
                filterAttributes:function(data){
                    if(data.name) delete data.name;
                    return data;
                }
            });
            expect(config.filterAttributes(config.data)).toMatchObject(config.data);
        });
    });

    describe('helper methods', function() {
        var isArray = GConfigQS.h.isArray;
        var isObject = GConfigQS.h.isObject;

        it('isArray', function(){
            expect(isArray({})).toBeFalsy();
        });
        it('isArray', function(){
            expect(isArray('')).toBeFalsy();
        });
        it('isArray', function(){
            expect(isArray()).toBeFalsy();
        });
        it('isArray', function(){
            expect(isArray([])).toBeTruthy();
        });

        it('isObject', function(){
            expect(isObject([])).toBeFalsy();
        });
        it('isObject', function(){
            expect(isObject()).toBeFalsy();
        });
        it('isObject', function(){
            expect(isObject({})).toBeTruthy();
        });
    });

    describe('QueryString', function() {
        var QueryString = GConfigQS.h.QueryString;

        beforeEach(function() {
            $('head').append(html);
        });

        afterEach(function(){
            $('meta').remove();
        });

        it('should have a QueryString object', function() {
            expect(GConfigQS.h.QueryString).toBeTruthy();
        });

        it('QueryString should serialize object to query string', function() {
            var config = new GConfig();
            var queryString = '?app[name]=GConfig+Tester&app[baseurl]=http%3A%2F%2Flocalhost%3A9030&app[default-controller]=Controller&widget[id]=widgetId';
            var expected = QueryString.stringify(config.data);
            expect(queryString).toEqual(expected);
        });

        it('QueryString should unserialize object to query string', function() {
            var config = new GConfig();
            var expected = QueryString.parse(QueryString.stringify(config.data));
            expect(config.data).toMatch(expected);
        });
    });
});