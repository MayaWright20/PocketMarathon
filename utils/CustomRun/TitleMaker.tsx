
export default function TitleMaker(item: any) {

    let title = '';

    if (item?.SPEED) {
        title = `🏎️ ${item?.SPEED}\n`;
    };

    if (item?.TIME) {
        if (item?.TIME?.HOURS !== undefined) {
            title = title + `⏱️ ${item?.TIME?.HOURS}:`
        } else {
            title = title + '⏱️ 00:'
        };

        if (item?.TIME?.MINS !== undefined) {
            title = title + `${item?.TIME?.MINS}:`
        } else {
            title = title + '00:'
        };

        if (item?.TIME?.SECS !== undefined) {
            title = title + `${item?.TIME?.SECS}\n`
        } else {
            title = title + '00\n'
        };
    };

    if (item?.DISTANCE) {
        if (item?.DISTANCE?.MILES !== undefined) {
            title = title + `📏 ${item?.DISTANCE?.MILES}:`
        } else {
            title = title + '📏 00:'
        };

        if (item?.DISTANCE?.KMS !== undefined) {
            title = title + `${item?.DISTANCE?.KMS}:`
        } else {
            title = title + '00:'
        };

        if (item?.DISTANCE?.METRES !== undefined) {
            title = title + `${item?.DISTANCE?.METRES}\n`
        } else {
            title = title + '00\n'
        };

    };

    return title;

};