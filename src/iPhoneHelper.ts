import { Dimensions, Platform, ScaledSize } from 'react-native';


export default class iPhoneHelper {
    static isIphoneX() {
        const dim = Dimensions.get('window');

        return (
            // This has to be iOS
            Platform.OS === 'ios' &&

            // Check either, iPhone X or XR
            (iPhoneHelper.isIPhoneXSize(dim) || iPhoneHelper.isIPhoneXsSize(dim))
        );
    }

    static isIPhoneXSize(dim: ScaledSize) {
        return dim.height == 812 || dim.width == 812;
    }

    static isIPhoneXsSize(dim: ScaledSize) {
        return dim.height == 896 || dim.width == 896;
    }
}