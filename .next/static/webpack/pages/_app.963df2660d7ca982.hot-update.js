"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/_app",{

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @tanstack/react-query */ \"./node_modules/@tanstack/react-query/build/modern/index.js\");\n/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-toastify */ \"./node_modules/react-toastify/dist/react-toastify.esm.mjs\");\n/* harmony import */ var _src_lib_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../src/lib/actions */ \"./src/lib/actions/index.js\");\n/* harmony import */ var _src_providers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../src/providers */ \"./src/providers/index.js\");\n/* harmony import */ var _src_index_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../src/index.css */ \"./src/index.css\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n// pages/_app.js\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\nconst queryClient = new _tanstack_react_query__WEBPACK_IMPORTED_MODULE_6__.QueryClient();\nfunction MyApp(param) {\n    let { Component, pageProps } = param;\n    _s();\n    (0,_src_lib_actions__WEBPACK_IMPORTED_MODULE_2__.useAuthState)();\n    (0,_src_lib_actions__WEBPACK_IMPORTED_MODULE_2__.useGetProfile)();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_tanstack_react_query__WEBPACK_IMPORTED_MODULE_6__.QueryClientProvider, {\n        client: queryClient,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"app\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_src_providers__WEBPACK_IMPORTED_MODULE_3__.StylesProvider, {}, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\user\\\\source\\\\repos\\\\groove-it\\\\pages\\\\_app.js\",\n                    lineNumber: 20,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_toastify__WEBPACK_IMPORTED_MODULE_1__.ToastContainer, {}, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\user\\\\source\\\\repos\\\\groove-it\\\\pages\\\\_app.js\",\n                    lineNumber: 21,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_src_providers__WEBPACK_IMPORTED_MODULE_3__.ThemeProvider, {\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                        ...pageProps\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\user\\\\source\\\\repos\\\\groove-it\\\\pages\\\\_app.js\",\n                        lineNumber: 24,\n                        columnNumber: 9\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\user\\\\source\\\\repos\\\\groove-it\\\\pages\\\\_app.js\",\n                    lineNumber: 23,\n                    columnNumber: 9\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"C:\\\\Users\\\\user\\\\source\\\\repos\\\\groove-it\\\\pages\\\\_app.js\",\n            lineNumber: 19,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\user\\\\source\\\\repos\\\\groove-it\\\\pages\\\\_app.js\",\n        lineNumber: 18,\n        columnNumber: 5\n    }, this);\n}\n_s(MyApp, \"m4O6hPmSsx8aPcfGQ11hWFrFuYw=\", false, function() {\n    return [\n        _src_lib_actions__WEBPACK_IMPORTED_MODULE_2__.useAuthState,\n        _src_lib_actions__WEBPACK_IMPORTED_MODULE_2__.useGetProfile\n    ];\n});\n_c = MyApp;\n/* harmony default export */ __webpack_exports__[\"default\"] = (MyApp);\nvar _c;\n$RefreshReg$(_c, \"MyApp\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = __webpack_module__.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = __webpack_module__.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, __webpack_module__.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                __webpack_module__.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                __webpack_module__.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        __webpack_module__.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    __webpack_module__.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsZ0JBQWdCOzs7QUFDeUQ7QUFDekI7QUFDaUI7QUFDQTtBQUN2QztBQUVBO0FBRTFCLE1BQU1RLGNBQWMsSUFBSVIsOERBQVdBO0FBRW5DLFNBQVNTLE1BQU0sS0FBd0I7UUFBeEIsRUFBRUMsU0FBUyxFQUFFQyxTQUFTLEVBQUUsR0FBeEI7O0lBQ2JSLDhEQUFZQTtJQUNaQywrREFBYUE7SUFFYixxQkFFRSw4REFBQ0gsc0VBQW1CQTtRQUFDVyxRQUFRSjtrQkFDM0IsNEVBQUNLO1lBQUlDLFdBQVU7OzhCQUNiLDhEQUFDUiwwREFBY0E7Ozs7OzhCQUNmLDhEQUFDSiwwREFBY0E7Ozs7OzhCQUVmLDhEQUFDRyx5REFBYUE7OEJBQ2QsNEVBQUNLO3dCQUFXLEdBQUdDLFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFPaEM7R0FuQlNGOztRQUNQTiwwREFBWUE7UUFDWkMsMkRBQWFBOzs7S0FGTks7QUFxQlQsK0RBQWVBLEtBQUtBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvX2FwcC5qcz9lMGFkIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIHBhZ2VzL19hcHAuanNcclxuaW1wb3J0IHsgUXVlcnlDbGllbnQsIFF1ZXJ5Q2xpZW50UHJvdmlkZXIgfSBmcm9tIFwiQHRhbnN0YWNrL3JlYWN0LXF1ZXJ5XCI7XHJcbmltcG9ydCB7IFRvYXN0Q29udGFpbmVyIH0gZnJvbSBcInJlYWN0LXRvYXN0aWZ5XCI7XHJcbmltcG9ydCB7IHVzZUF1dGhTdGF0ZSwgdXNlR2V0UHJvZmlsZSB9IGZyb20gXCIuLi9zcmMvbGliL2FjdGlvbnNcIjtcclxuaW1wb3J0IHsgVGhlbWVQcm92aWRlciwgU3R5bGVzUHJvdmlkZXIgfSBmcm9tIFwiLi4vc3JjL3Byb3ZpZGVyc1wiO1xyXG5pbXBvcnQgIFwiLi4vc3JjL2luZGV4LmNzc1wiXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuY29uc3QgcXVlcnlDbGllbnQgPSBuZXcgUXVlcnlDbGllbnQoKTtcclxuXHJcbmZ1bmN0aW9uIE15QXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfSkge1xyXG4gIHVzZUF1dGhTdGF0ZSgpO1xyXG4gIHVzZUdldFByb2ZpbGUoKTtcclxuXHJcbiAgcmV0dXJuIChcclxuXHJcbiAgICA8UXVlcnlDbGllbnRQcm92aWRlciBjbGllbnQ9e3F1ZXJ5Q2xpZW50fT5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhcHBcIj5cclxuICAgICAgICA8U3R5bGVzUHJvdmlkZXIgLz5cclxuICAgICAgICA8VG9hc3RDb250YWluZXIgLz5cclxuXHJcbiAgICAgICAgPFRoZW1lUHJvdmlkZXI+XHJcbiAgICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxyXG4gICAgICAgIDwvVGhlbWVQcm92aWRlcj4gXHJcblxyXG4gICAgICAgXHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9RdWVyeUNsaWVudFByb3ZpZGVyPlxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE15QXBwO1xyXG4iXSwibmFtZXMiOlsiUXVlcnlDbGllbnQiLCJRdWVyeUNsaWVudFByb3ZpZGVyIiwiVG9hc3RDb250YWluZXIiLCJ1c2VBdXRoU3RhdGUiLCJ1c2VHZXRQcm9maWxlIiwiVGhlbWVQcm92aWRlciIsIlN0eWxlc1Byb3ZpZGVyIiwiUmVhY3QiLCJxdWVyeUNsaWVudCIsIk15QXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIiwiY2xpZW50IiwiZGl2IiwiY2xhc3NOYW1lIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/_app.js\n"));

/***/ })

});