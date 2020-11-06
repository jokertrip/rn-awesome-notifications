define(["require", "exports", "react-native"], function (require, exports, react_native_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var iPhoneHelper = /** @class */ (function () {
        function iPhoneHelper() {
        }
        iPhoneHelper.isIphoneX = function () {
            var dim = react_native_1.Dimensions.get('window');
            return (
            // This has to be iOS
            react_native_1.Platform.OS === 'ios' &&
                // Check either, iPhone X or XR
                (iPhoneHelper.isIPhoneXSize(dim) || iPhoneHelper.isIPhoneXsSize(dim)));
        };
        iPhoneHelper.isIPhoneXSize = function (dim) {
            return dim.height == 812 || dim.width == 812;
        };
        iPhoneHelper.isIPhoneXsSize = function (dim) {
            return dim.height == 896 || dim.width == 896;
        };
        return iPhoneHelper;
    }());
    exports.default = iPhoneHelper;
});
