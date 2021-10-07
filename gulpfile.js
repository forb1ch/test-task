const {
	src,
	dest
} = require('gulp');

const sass         = require('gulp-sass')(require('sass'));
const bulk         = require('gulp-sass-bulk-importer');
const autoprefixer = require('gulp-autoprefixer');
const clean        = require('gulp-clean-css');
const concat       = require('gulp-concat');
const map          = require('gulp-sourcemaps');
const bs           = require('browser-sync');
const uglify       = require('gulp-uglify-es').default;
const browserSync  = require('browser-sync').create();
const gulp         = require('gulp');

const paths = {
	scss: {
		src: 'app/scss/**/*.scss',
		dest: 'app/dist/css'
	},
	js: {
		src: 'app/js/*.js',
		dest: 'app/dist/js'
	}
}

gulp.task('browser-sync', function() {
	browserSync.init({
		proxy: 'http://test.docker.localhost:8275',
	})
});

gulp.task('sass', function() {
	return src(paths.scss.src)
		.pipe(map.init())
		.pipe(bulk())
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 2 versions'],
			browsers: [
				'Android >= 4',
				'Chrome >= 20',
				'Firefox >= 24',
				'Explorer >= 11',
				'iOS >= 6',
				'Opera >= 12',
				'Safari >= 6',
			],
		}))
		.pipe(clean({
			level: 2
		}))
		.pipe(concat('style.min.css'))
		.pipe(dest(paths.scss.dest))
		.pipe(bs.stream())
		.pipe(browserSync.reload({ stream: true }));
});

gulp.task('js', function() {
	return gulp.src([
		paths.js.src,
	])
		.pipe(concat('scripts.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(paths.js.src))
		.pipe(browserSync.reload({ stream: true }));
});

gulp.task('watch', function() {
	gulp.watch(paths.scss.src, gulp.parallel('sass'));
	gulp.watch([paths.js.src], gulp.parallel('js'));
});

gulp.task('default', gulp.parallel('sass', 'js', 'browser-sync', 'watch'));
