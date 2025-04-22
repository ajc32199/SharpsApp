// jest.config.js
module.exports = {
    preset: "jest-expo",
    setupFilesAfterEnv: [
      "@testing-library/jest-native/extend-expect"
    ],
    transform: {
      // ensure .js/.jsx/.ts/.tsx files get babel‑jest’d
      "^.+\\.[jt]sx?$": "babel-jest"
    },
    transformIgnorePatterns: [
      // pardon these modules—they must be transformed
      "node_modules/(?!(react-native|@react-native|expo|expo-image-picker|expo-location|react-native-maps|@unimodules|expo-modules-core)/)"
    ],
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/$1"
    }
  };
  