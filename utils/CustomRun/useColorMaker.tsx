import { COLORS } from "../../Constants/General/COLORS";

export default function useColorMaker(item: any) {

    let color = '';
    let color2 = '';

    if (item?.SPEED) {
        color = COLORS.MEDIUM_BLUE;
        if (item?.TIME) {
            color2 = COLORS.PINK;
        };

        if (item?.DISTANCE) {
            color2 = COLORS.GREEN;
        };

        return { color, color2 }
    };

    if (item?.TIME) {
        color = COLORS.PINK;
        if (item?.DISTANCE) {
            color2 = COLORS.GREEN;
        };
        return { color, color2 };
    };

    return { color, color2 };
};
