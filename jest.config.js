module.exports = {
  testEnvironment: 'jsdom',
  globals: {
    TextEncoder: require("util").TextEncoder, // この記述でグローバル化してあげる必要あり
    TextDecoder: require("util").TextDecoder,
  },
};
