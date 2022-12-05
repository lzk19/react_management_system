// 用户信息验证规则模块
const { required } = require('@hapi/joi')
const joi = require('@hapi/joi')
// string()值必须是字符串
// alphanum()值只能是包含a-zA-Z0-9的字符串
// min(length)最小长度
// max(length)最大长度
// required()值是必填项，不能为undefined
// pattern(正则表达式)值必须符合正则表达式的规则

// 用户名的验证规则