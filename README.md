# inferno-starter

``` bash
cd {project_name}
```

``` bash

yarn

```

# dev

``` bash

yarn start

```

# build

``` bash

yarn run build

```

alias react -> inferno

``` js

// webpack.config.js

resolve.alias = {
  'react': 'inferno-compat',
  'react-dom': 'inferno-compat'
}
```

But Inferno does not support HMR
