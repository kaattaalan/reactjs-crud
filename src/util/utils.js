

const userRoles = {
    'user': 'ROLE_USER',
    'mod': 'ROLE_MODERATOR',
    'admin': 'ROLE_ADMIN'
};


export const timeSince = function (date) {
    var timeStamp = Date.parse(date);
    var now = new Date();
    var secondsPast = (now.getTime() - timeStamp) / 1000;

    if (secondsPast < 60) {
        return Math.round(secondsPast) + 's';
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

export const hasDeletePermission = function (user) {
    if (!user || !user.roles || user.roles.length === 0) {
        return false;
    }
    if (user.roles.includes(userRoles.mod) || user.roles.includes(userRoles.admin)) {
        return true;
    }
    return false;
}

export const checkNested = function (obj /*, level1, level2, ... levelN*/) {
    var args = Array.prototype.slice.call(arguments, 1);

    for (var i = 0; i < args.length; i++) {
        if (!obj || !obj.hasOwnProperty(args[i])) {
            return false;
        }
        obj = obj[args[i]];
    }
    return true;
}
