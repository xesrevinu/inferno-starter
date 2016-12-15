# inferno-starter

``` bash
cd {project_name}
```

``` bash

yarn

```

# dev

``` bash

npm start

```

# build

``` bash

npm run build

```

alias react -> inferno

``` js

// webpack.config.js

resolve.alias = {
  'react': 'inferno-compat',
  'react-dom': 'inferno-compat',
  'react-router': 'inferno-router'
}
```

But Inferno does not support HMR
