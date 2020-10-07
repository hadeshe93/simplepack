本项目可用于三个方面：
1. `src/simplepack`，开发一个简易的 webpack，用于学习和验证 webpack 的内部原理；
2. `src/loaders`，用于开发和调试自己的 loader，可以借助 `loader-runner` 快速开发调试，然后再通过 webpack 来验证；
3. `src/plugins`，用于开发和调试自己的 plugin，只能通过 webpack 来进行开发、调试和验证了。

## 快速开始

首先 clone 项目到本地，然后安装依赖：
```bash
$ npm install
```

接着就编写代码，自行开发验证即可。


## 目录说明

```
./
├── README.md
├── apps
│   ├── app-plugin
│   └── app-simplepack
├── package-lock.json
├── package.json
├── src
│   ├── loaders
│   ├── plugins
│   └── simplepack
└── tsconfig.json

7 directories, 4 files
```

目前目录结构如上，`apps` 下面用于存放用于验证不同模块的应用层代码，比如 `app-simplepack` 就是专门用来验证 `src/simplepack` 的代码功能的；`app-plugin` 就是专门用来验证 `src/plugins` 中插件功能的。当然，在目录的划分上，还可以再细致一些。