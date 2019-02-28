var gulp = require('gulp');


//压缩html
//gulp中插件的应用   下载插件 --> 取到插件 --> 应用插件
var htmlClean = require('gulp-htmlclean');

//压缩图片
var imageMin = require('gulp-imagemin');

//压缩js

var uglify = require('gulp-uglify');


//去掉js的调试语句
var debug = require('gulp-strip-debug');

//讲less 转换成css
var less = require('gulp-less');

//压缩css
var cleanCss = require('gulp-clean-css');


// postcss autoprofixe
var postCss = require('gulp-postcss');
var autoprofixe = require('autoprefixer');

// 开启服务器
var connect = require('gulp-connect');


var folder = {
    src:'src/',
    dist: 'dist'
}

//判断当前环境变量
var devMod = process.env.NOOE_ENV == 'development';
// export NOOE_ENV=development   设置环境变量



gulp.task('html',function(){
    var page = gulp.src(folder.src + 'html/*')
        .pipe(connect.reload())
        if(!devMod){
            page.pipe(htmlClean())
        }
        page.pipe(gulp.dest(folder.dist + '/html/'))
})

gulp.task('image',function(){
    console.log(folder.src)
    gulp.src(folder.src + 'image/*')
        .pipe(connect.reload())
        // .pipe(imageMin())
        .pipe(gulp.dest(folder.dist + '/image/'))
})


gulp.task('css',function(){
    var page = gulp.src(folder.src + 'css/*')
        .pipe(connect.reload())
        .pipe(less())
        .pipe(postCss([autoprofixe()]))
        if(!devMod){
            page.pipe(cleanCss())
        }
        page.pipe(gulp.dest(folder.dist + '/css/'))
})

gulp.task('js',function(){
   var page = gulp.src(folder.src + 'js/*')
        .pipe(connect.reload())
        if(!devMod){
            page.pipe(debug())
            page.pipe(uglify())
        }
        page.pipe(gulp.dest(folder.dist + '/js/'))
})

gulp.task('server',function(){
    connect.server({
        port:8899,
        livereload:true
    })
})


//监听文件变化
gulp.task('watch',function(){
    gulp.watch(folder.src + '/html/*',['html']);
    gulp.watch(folder.src + '/css/*',['css'])
    gulp.watch(folder.src + '/js/*',['js'])

})


gulp.task('default',['html','css','js','image','server','watch']);
gulp.task('default',gulp.parallel('html');
