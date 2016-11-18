# mild-config [![Build Status](https://travis-ci.org/iguntur/mild-config.svg?branch=master)](https://travis-ci.org/iguntur/mild-config)

> Mild config for gulp

Make easy and simple to setup __[gulp](https://www.npmjs.com/package/gulp)__ config tasks.


### Requirement

- __Node 4+__


## Install

``` bash
$ npm install --save mild-config
```


## Usage

``` js
const gulp = require('gulp');
const webpack = require('webpack-stream');
const sass = require('gulp-sass');
const config = require('mild-config');

gulp.task('script', () => {
    return gulp.src(config.src('js/*.js'))
        .pipe(webpack(config.get('plugins.webpack')))
        .pipe(gulp.dest(config.dest('js')));
});

gulp.task('sass', () => {
    return gulp.src(config.src('sass/**/*.scss'))
        .pipe(sass(config.get('plugins.sass')))
        .pipe(gulp.dest(config.dest('css')));
});
```


## API

> Also See [dot-prop](https://www.npmjs.com/package/dot-prop#api) API

### Instance

- __config.set(key, value)__

    Set an item.

- __config.set(object)__

    Set multiple items at once.

- __config.get(key)__

    Get an item.

- __config.has(key)__

    Check if an item exists.

- __config.delete(key)__

    Delete an item.

- __config.clear()__

    Delete all items.

- __config.src(path)__

    Return the `path` and include with prefix path `'resources/assets'`, <br>
    ensure the `path` does not begin with `'/'`, `'./'`, `'../'`.

    __path__ <br>
    Type: `string`, `array`


    __Example__

    ``` js
    const config = require('mild-config');

    config.src('js/*.js');
    //=> 'resources/assets/js/*.js'

    config.src('./_assets/js/*.js');
    //=> './_assets/js/*.js'

    config.src(['js/*.js', '!js/vendor/**']);
    //=> ['resources/assets/js/*.js', '!resources/assets/js/vendor/**']

    config.src(['js/*.js', '!./node_modules/**']);
    //=> ['resources/assets/js/*.js', '!./node_modules/**']
    ```

- __config.dest(folder)__

    Return the `folder` and include with prefix path `'public/assets'`, <br>
    ensure the `folder` does not begin with `'/'`, `'./'`, `'../'`.

    __folder__ <br>
    Type: `string`

    Set your folder destination

    __Example__

    ``` js
    const config = require('mild-config');

    config.dest('css');
    //=> 'public/assets/css'

    config.dest('./public/css');
    //=> './public/css'
    ```

- __config.join([...paths])__

    Returns path using __[path.join](https://nodejs.org/api/path.html#path_path_join_paths)__

    __paths__ <br>
    Type: `string`

    __Example__

    ``` js
    const config = require('mild-config');

    config.join('basePath', 'assetsPath', 'gulp.src.js', 'foo.js');
    //=> 'resources/assets/scripts/foo.js'

    var path = config.join('basePath', 'assetsPath', 'gulp.src.js', 'foo.js');

    config.join('publicPath', 'assetsPath', 'gulp.dest.js');
    //=> 'public/assets/js'
    ```


## Related

- [dot-prop](https://github.com/sindresorhus/dot-prop) - API for this module (Get, set, or delete a property from a nested object using a dot path)


## License

MIT © [Guntur Poetra](http://guntur.starmediateknik.com)
