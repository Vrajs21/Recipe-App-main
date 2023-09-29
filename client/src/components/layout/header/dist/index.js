"use strict";
exports.__esModule = true;
exports.Header = void 0;
var react_1 = require("react");
var core_1 = require("@refinedev/core");
var material_1 = require("@mui/material");
var icons_material_1 = require("@mui/icons-material");
var contexts_1 = require("../../../contexts");
var CustomButton_1 = require("../../common/CustomButton");
var react_router_dom_1 = require("react-router-dom");
exports.Header = function () {
    var _a = react_1.useContext(contexts_1.ColorModeContext), mode = _a.mode, setMode = _a.setMode;
    var user = core_1.useGetIdentity({
        v3LegacyAuthProviderCompatible: true
    }).data;
    var shouldRenderHeader = true; // since we are using the dark/light toggle; we don't need to check if user is logged in or not.
    var navigate = react_router_dom_1.useNavigate();
    var handleCreateRecipeClick = function () {
        navigate('/recipes/create');
    };
    return shouldRenderHeader ? (react_1["default"].createElement(material_1.AppBar, { color: "default", position: "sticky", elevation: 0, sx: { background: "#FCFCFC" } },
        react_1["default"].createElement(material_1.Toolbar, null,
            react_1["default"].createElement(material_1.Stack, { direction: "column", width: "50%", justifyContent: "flex-end", alignItems: "center" },
                react_1["default"].createElement(CustomButton_1["default"], { handleClick: handleCreateRecipeClick, title: "create recipe ", backgroundColor: "#475be8", color: "#fcfcfc" }),
                react_1["default"].createElement(material_1.Stack, { direction: "row", width: "100%", justifyContent: "flex-end", alignItems: "center" },
                    react_1["default"].createElement(material_1.IconButton, { onClick: function () {
                            setMode();
                        } }, mode === "dark" ? (react_1["default"].createElement(icons_material_1.LightModeOutlined, null)) : (react_1["default"].createElement(icons_material_1.DarkModeOutlined, null))),
                    react_1["default"].createElement(material_1.Stack, { direction: "row", gap: "16px", alignItems: "center", justifyContent: "center" },
                        (user === null || user === void 0 ? void 0 : user.name) ? (react_1["default"].createElement(material_1.Typography, { variant: "subtitle2" }, user === null || user === void 0 ? void 0 : user.name)) : null,
                        (user === null || user === void 0 ? void 0 : user.avatar) ? (react_1["default"].createElement(material_1.Avatar, { src: user === null || user === void 0 ? void 0 : user.avatar, alt: user === null || user === void 0 ? void 0 : user.name })) : null)))))) : null;
};
