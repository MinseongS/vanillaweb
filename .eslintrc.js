module.exports = {
  extends: ["airbnb", "plugin:prettier/recommended"],
  env: {
    browser: true,
    es6: true,
  },
  plugins: ["prettier"],
  rules: {
    "no-alert": "error", // alert 사용을 허용하지 않음
    "no-unused-vars": [
      "error",
      {
        varsIgnorePattern: "_", // 사용하지 않는 변수명 언더스코어 허용
        argsIgnorePattern: "_", // 사용하지 않는 인수명 언더스코어 허용
      },
    ],
    "prettier/prettier": [
      "error",
      {
        singleQuote: false, // 작음따옴표 사용하지 않음
        semi: true, // 문장의 끝에 세미콜론 표시
        useTabs: false, // tab 공백 대신 space 사용
        tabWidth: 2, // 1 tab = 2 space
        trailingComma: "all", // 배열의 마지막 원소에 쉼표 붙임
        printWidth: 80, // 한 줄에 코드 길이 80자 이내
        arrowParens: "avoid", // remove parentheses around a sole arrow function parameter
      },
    ],
  },
};
