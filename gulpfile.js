var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    shell = require('gulp-shell')
    ;

var serverPort = 1234;
/**
 * 运行服务
 */
gulp.task('server', shell.task([
  'hexo server -p ' + serverPort
]))

/**
 * 内容或风格变动自动刷新
 */
gulp.task('watch_source_themes', function() {
  livereload.listen();
  gulp.watch(['source/**','themes/**'], function(event){  
      console.log('[!] File changed:\n');
      setTimeout(function(){
          var consoleInfo = event.path.replace(__dirname,'');
          livereload.changed(consoleInfo);
      },1000);
  });  
});

/**
 * 内容或风格变动自动刷新
 */
gulp.task('watch_config', function() {
  livereload.listen();
  gulp.watch(['_config.yml'], function(event){
      console.log('[!] Config changed:\n');
      var consoleInfo = event.path.replace(__dirname,'');
      livereload.changed(consoleInfo);
  });
});


/**
 * 清理
 */
gulp.task('clean', shell.task([
  'kill -9 $(lsof -i:' + serverPort + ' |awk \'{print $2}\' | tail -n 2)',
  'hexo clean',
  'rm -rf .deploy_git'
]));

/**
 * 终止残余服务
 */
gulp.task('kill-server', shell.task([
  'kill -9 $(lsof -i:' + serverPort + ' |awk \'{print $2}\' | tail -n 2)'
]));


/**
 * 发布上线
 */
gulp.task('publish', shell.task([
  'hexo d -g'
]))


gulp.task('default', ['server','watch_source_themes','watch_config']);