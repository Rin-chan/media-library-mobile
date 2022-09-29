import { Platform } from 'react-native';

export const FontFamilyNormal = {
    ...Platform.select({
        ios: {
            fontFamily: 'Helvetica',
        },
        android: {
            fontFamily: 'sans-serif',
        },
    })
}

export const FontFamilyLight = {
    ...Platform.select({
        ios: {
            fontFamily: 'Helvetica-Light',
        },
        android: {
            fontFamily: 'sans-serif-light',
        },
    })
}

export const FontFamilyBold = {
    ...Platform.select({
        ios: {
            fontFamily: 'Helvetica-Bold',
        },
        android: {
            fontFamily: 'sans-serif-medium',
        },
    })
}

export const h1 = {
    fontSize: 30
};

export const h2 = {
    fontSize: 18
}

export const h3 = {
    fontSize: 16
}