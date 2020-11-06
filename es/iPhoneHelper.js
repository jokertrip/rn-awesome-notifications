import { Dimensions, Platform } from 'react-native';
var iPhoneHelper = /** @class */ (function () {
    function iPhoneHelper() {
    }
    iPhoneHelper.isIphoneX = function () {
        var dim = Dimensions.get('window');
        return (
        // This has to be iOS
        Platform.OS === 'ios' &&
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
export default iPhoneHelper;
