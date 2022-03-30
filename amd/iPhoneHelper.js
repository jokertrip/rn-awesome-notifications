define(["require", "exports", "react-native"], function (require, exports, react_native_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class iPhoneHelper {
        static isIphoneX() {
            const dim = react_native_1.Dimensions.get('window');
            if (dim.height < dim.width)
                return false;
            return (
            // This has to be iOS
            react_native_1.Platform.OS === 'ios' &&
                // Check either, iPhone X or XR
                (iPhoneHelper.isIPhoneXSize(dim) ||
                    iPhoneHelper.isIPhoneXsSize(dim) ||
                    iPhoneHelper.isIPhone12Size(dim) ||
                    iPhoneHelper.isIPhone12MaxSize(dim)));
        }
        static isIPhoneXSize(dim) {
            return dim.height == 812 || dim.width == 812;
        }
        static isIPhoneXsSize(dim) {
            return dim.height == 896 || dim.width == 896;
        }
        static isIPhone12Size(dim) {
            return dim.height === 896 || dim.width === 896;
        }
        static isIPhone12MaxSize(dim) {
            return dim.height === 926 || dim.width === 926;
        }
        static selectIPhone(options) {
            return iPhoneHelper.isIphoneX() ? options.forX : options.default;
        }
    }
    exports.default = iPhoneHelper;
});
