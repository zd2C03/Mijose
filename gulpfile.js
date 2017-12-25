'use strict';

// varの後のgulp/browserSync/sassなどは自分でつけた名前/この名前で呼び出すよ～
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require("gulp-sass");
var minifycss   = require("gulp-minify-css");
var del         = require("del");
var plumber     = require("gulp-plumber");

    // 【コピー作成】assetsフォルダ内にhtmlファイルが保存されたら、htmlフォルダ内にもhtmlファイルをコピー作成する/プランバーでエラーでも止めない/ブラウザリンクで同期
   gulp.task('copy',function(){
        return gulp.src(['assets/**/*.html'])
        .pipe(plumber())
        .pipe(gulp.dest('html/'))
        .pipe(browserSync.stream());
    });

    // 【sassコンパイル】scssファイルを、cssファイルに呼び出す/ミニファイでcss圧縮
    gulp.task('sass',function(){
        return gulp.src(['assets/stylesheets/**/*.scss'])
        .pipe(plumber())
        .pipe(sass({outputStyle:'expanded'}))
        .pipe(minifycss())
        .pipe(gulp.dest('html/css/'))
        .pipe(browserSync.stream());
    });


    gulp.task("delHtml",function(){
        del(["html/*.html"]);
    });
    gulp.task("delSass", function(){
        del(["html/css/*.css"]);
    });

    //【ブラウザ同期】
    gulp.task('default',['delHtml','delSass','copy','sass'],function(){
            browserSync.init({
                server:{
                    baseDir:"html"
                }
            });

    //【監視と更新】 assetsフォルダ内にhtml/scssファイルが保存されたら、以下の該当ファイルもコピー保存することを監視する
        gulp.watch(['assets/**/*.html'],['delHtml','copy']);
        gulp.watch(['assets/stylesheets/*.scss'],['delSass','sass']);
    });