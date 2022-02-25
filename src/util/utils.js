

export const timeSince = function (date) {
    var timeStamp = Date.parse(date);
    var now = new Date();
    var secondsPast = (now.getTime() - timeStamp) / 1000;

    if (secondsPast < 60) {
        return secondsPast + 's';
    }
    if (secondsPast < 3600) {
        return parseInt(secondsPast / 60) + ' mins';
    }
    if (secondsPast <= 86400) {
        return parseInt(secondsPast / 3600) + ' hours';
    }
    if (secondsPast <= 2628000) {
        return parseInt(secondsPast / 86400) + ' days';
    }
    if (secondsPast <= 31536000) {
        return parseInt(secondsPast / 2628000) + ' mo.s';
    }
    if (secondsPast > 31536000) {
        return parseInt(secondsPast / 31536000) + ' years';
    }
}
