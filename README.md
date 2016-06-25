# mild-config [![Build Status](https://travis-ci.org/iguntur/mild-config.svg?branch=master)](https://travis-ci.org/iguntur/mild-config)

> Mild config for gulp


## Install

```
$ npm install --save mild-config
```


## Usage

``` js
const path = require('path');
const gulp = require('gulp');
const config = require('mild-config');

const source = path.join(config.get('js.sourcePath'), 'app.js');
const output = path.join(config.get('js.outputPath'), 'bundle.js');

gulp.task('script', () => {
    return gulp.src(source)
        .pipe(plugin1())
        .pipe(plugin2())
        .pipe(gulp.dest(output));
});
```

## API

### config.get(path)

Returns a value of path

- #### path

    Type: `string` <br>

    Get a config item using a dot-notation.


## Related

- [dot-prop](https://github.com/sindresorhus/dot-prop) - API for this module (Get, set, or delete a property from a nested object using a dot path)


## License

MIT © [Guntur Poetra](http://guntur.starmediateknik.com)
