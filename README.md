# vue2-ts-vite-template

## Usage

### init 
```sh
pnpm i
```

### start dev
```sh
pnpm dev
```

## Vue 2 + TypeScript 项目初始化

本文档介绍了如何使用 Vite 初始化一个 Vue 2 + TypeScript 项目。

### 步骤

1. 安装 Node.js 和 pnpm：请确保在本地环境中已经安装了 Node.js 和 pnpm。可以从 Node.js 官网（https://nodejs.org/）下载并安装最新的稳定版本，并使用以下命令全局安装 pnpm：

```sh
npm install -g pnpm

```

2. 安装 Vite：

```sh
npm install -g create-vite
```

3. 初始化 Vue 2 + TypeScript 项目：

```sh
 pnpm create vite
```

填写项目名称，并选择`Vanilla`

```
✔ Select a framework: › Vanilla
```

选择`TypeScript`
```
✔ Select a variant: › TypeScript
```

这将使用 pnpm 包管理工具和 vite 构建工具，创建一个名为 "vue2-ts-vite-demo" 的 Vue 2 + TypeScript 项目。

4. 切换到项目目录：

```
cd vue2-ts-vite-demo
```

5. 安装项目依赖：

```
pnpm install
```

安装vue2生态
```sh
pnpm i vue@2 vue-template-compiler@2
```

安装vite vue2插件, vue-tsc
```sh
pnpm i @vitejs/plugin-vue2 vue-tsc @types/node -D
```

6. 配置 @vitejs/plugin-vue2：在项目的 vite.config.js 文件中添加以下配置：

```ts
import { fileURLToPath } from "url";
import vue from '@vitejs/plugin-vue2'
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    sourcemap: true,
    minify: false,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  }
})
```

7. 在`src/main.ts`文件中添加（替换）如下代码

```
import Vue from 'vue';
import App from './App.vue';

new Vue({
  render: (h) => h(App),
}).$mount('#app');

```

8. 在项目中创建 Vue 2 的组件文件（如 src/App.vue）：

```vue
<template>
  <div>
    <h1>Hello Vue 2!</h1>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
/* Add your styles here */
</style>

```

9. 添加vue2的`ts`描述(`src/vite-env.d.ts`)代码

```ts
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}
```

10. tsconfig.json 修改如下

```ts
{
  "compilerOptions": {
    "baseUrl": "./",
    "target": "ESNext",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ESNext", "DOM"],
    "moduleResolution": "Node",
    "strict": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "noEmit": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "skipLibCheck": true,
    "paths": {
      "@/*": ["src/*"]
    },
  },
  "vueCompilerOptions": {
    "target": 2.7
  },
  "include": [
    "vite.config.*",
    "src/**/*.vue",
    "src/**/*.ts",
    "src/**/*.d.ts",
    "node_modules/vue/*.d.ts" // 添加这一行
  ]
}

```
11. 调整package.json部分命令

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc --noEmit && vite build",
    "preview": "vite preview"
  }
}
```

11. 运行开发者服务器：


```
pnpm run dev

```

这将启动一个本地开发服务器，并在浏览器中打开 Vue 2 + TypeScript 项目的预览页面。

现在，你已经成功初始化了一个 Vue 2 + TypeScript 项目，并使用 pnpm 和 vite 作为包管理工具和构建工具。你可以根据需要在项目中添加、更新或者移除依赖包，并使用 pnpm 进行管理和构建，同时使用 vite 进行快速的开发和构建。pnpm 提供了类似于 npm 和 yarn 的功能，但具有更快的速度和更少的磁盘占用，vite 则是一款现代化的构建工具，可以帮助你更好地管理 Vue 2 + TypeScript 项目的开发和构建流程。

## 参考文档

* [@vitejs/plugin-vue2](https://github.com/vitejs/vite-plugin-vue2)
* [vite](https://cn.vitejs.dev/guide/)
* [基于Vite创建一个Vue2项目](https://juejin.cn/post/7130924539067760677)
