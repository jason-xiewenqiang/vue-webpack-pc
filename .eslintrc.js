module.exports = {
    root: true,
    extends: [
        'standard',
        "plugin:flowtype/recommended",
        "eslint:recommended", 
        "plugin:vue/essential"
    ],
    plugins: [
        'html',
        'vue',
        'react',
        'flowtype'
    ],
    settings: {
        "flowtype": {
            "onlyFilesWithFlowAnnotation": true,// 只检查 声明 flow语法的文件
        }
    },
    parserOptions: {
        //此项是用来指定eslint解析器的，解析器必须符合规则，babel-eslint解析器是对babel解析器的包装使其与ESLint解析
        parser: "babel-eslint",
        sourceType: 'module', // 按照模块的方式解析
        // "ecmaVersion": 6,
        "ecmaFeatures": {
            "jsx": true
        }
    },
    env: {
        browser: true,
        node: true,
        es6: true,
        commonjs: true,
        amd: true
    },
    rules: {
        "linebreak-style": [0, "error", "windows"],
        "indent": ['error', 4], // error类型，缩进4个空格
        'space-before-function-paren': 0, // 在函数左括号的前面是否有空格
        'eol-last': 0, // 不检测新文件末尾是否有空行
        'semi': ['error', 'always'], // 必须在语句后面加分号
        "quotes": ["error", "double"], // 字符串没有使用单引号
        "no-console": ["error", {
            allow: ["log", "warn"]
        }], // 允许使用console.log()
        "arrow-parens": 0,
        "no-new": 0, //允许使用 new 关键字
        "no-undef": 0, // 关闭全局变量检测
        "quotes":0,// 关闭全局变量检测
    },
    globals: { // 允许全局变量,将$设置为true，表示允许使用全局变量$
        "document": true,
        "localStorage": true,
        "window": true,
        "jQuery": true,
        $: true
    }
}