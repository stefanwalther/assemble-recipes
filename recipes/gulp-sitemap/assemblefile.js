﻿'use strict';

var app = require('assemble')();
var path = require('path');
var ext = require('gulp-ext');
var sitemap = require('gulp-sitemap');

app.option('layout', 'default');
app.layouts(path.join(__dirname, 'src/layouts/**/*.hbs'));

app.task('pages', function () {

    //Here we are using a gulp plugin to replace the .hbs ext with .html for all the pages.
    return app.src('src/pages/**/*.hbs', { layout: 'default' })
            .pipe(app.renderFile())
            .pipe(ext.replace('html'))
            .pipe(app.dest('wwwroot'));
});


app.task('default', ['pages'], function () {

    //Here we are using a gulp plugin to generate a sitemap for the files generated by the pages task.
    return app.src('wwwroot/**/*.html')
        .pipe(sitemap({
                siteUrl: 'http://whatever.site'
            }))
        .pipe(app.dest('wwwroot'));    
});


module.exports = app;