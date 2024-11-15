import { subDays, subMonths, startOfMonth } from 'date-fns';

export function datePipe(d: any) {
    var date = new Date(d);
    return (

        (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
        "/" +
        (date.getMonth() > 8
            ? date.getMonth() + 1
            : "0" + (date.getMonth() + 1)) +
        "/" +
        date.getFullYear()
    );
};

export function timePipe(d: any) {
    if (!d) return ''
    var date = new Date(d);
    return (date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`) + ":" + (date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`);
};

export function dateRangeString(dates: any) {
    if (!dates) return ''
    return Array.from(dates).map((x: any) => x.toISOString().split('T')[0]).join(',')
};

export const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

export function removeVietnameseTones(str: string) {
    if (!str) {
        return str;
    }
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u21b5|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, " ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str
        .replace(
            /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|`|{|}|\||\\/g,
            ""
        )
        .replace(/\n/gi, "");
    return str.trim();
};

export function parseJwt(token: string) {
    try {
        return JSON.parse(window.atob(token.split(".")[1]));
    } catch (e) {
        return null;
    }
};

export const getFormattedDate = (date: string | Date, isoDateTime?: boolean) => {
    if (!date) {
        return ''
    }

    if (isoDateTime) {
        const d = new Date(date).toISOString()
        return (
            d.substring(0, 10).replace('-', '/').replace('-', '/') +
            ' ' +
            d.split('T')[1].split(':')[0] +
            ':' +
            d.split('T')[1].split(':')[1]
        )
    } else {
        date = new Date(date)
    }

    let year = date.getFullYear()
    let month = (1 + date.getMonth()).toString().padStart(2, '0')
    let day = date.getDate().toString().padStart(2, '0')
    if (isoDateTime) {
        return (
            year +
            '/' +
            month +
            '/' +
            day +
            ' ' +
            date.getHours() +
            ':' +
            date.getMinutes
        )
    } else {
        return year + '-' + month + '-' + day
    }
}

export const isDeepEqual = (changes: { [key: string]: any }, object1: any, object2: any) => {
    const objKeys1 = Object.keys(object1);
    //const objKeys2 = Object.keys(object2);

    for (var key of objKeys1) {
        const value1 = object1[key];
        const value2 = object2[key];

        const isObjects = isObject(value1) && isObject(value2);

        if ((isObjects && !isDeepEqual(changes, value1, value2)) ||
            (!isObjects && value1 !== value2)
        ) {
            Object.assign(changes, { [key]: value1 })
        }
    }
    return changes;
};

const isObject = (object: any) => {
    return object != null && typeof object === "object";
};

export const onErrorImg = (e: any) => {
    if (process.client) {
        if (e.target.hasAttribute('placeholder')) {
            e.target.src = e.target.getAttribute('placeholder') ?? '';
        } else {
            e.target.src = "/placeholder.png";
        }
    }
}

String.prototype.addQueryString = function (queryObj) {
    if (!queryObj) return this;
    let queryStr = "";
    for (let p in queryObj) {
        if (p && (queryObj[p] || queryObj[p] === 0 || queryObj[p] === false)) {
            if (!Array.isArray(queryObj[p])) {
                if (queryStr) queryStr += "&";
                queryStr += `${p}=${encodeURIComponent(queryObj[p])}`;
            } else {
                for (let item of queryObj[p]) {
                    if (item || item === false || item === 0) {
                        if (queryStr) queryStr += "&";
                        queryStr += `${p}=${encodeURIComponent(item)}`;
                    }
                }
            }
        }
    }

    return queryStr
        ? `${this}${this.indexOf("?") > 0 ? "&" : "?"}${queryStr}`
        : this;
}

export function getStandardSortForQuerryParam(sort?: string, asc?: string) {
    if (!sort) return ''
    if (sort && !asc) return `${sort},asc`
    return `${sort},${asc}`
}


export function format(amount: any, decimal: number, thousands: string, decimalPlace: any) {

    try {

        if (amount === '') return ''
        if (amount === 0 || (amount + '').trim() === '0') return '0';
        if (!amount) return '';

        amount = amount + '';

        if (amount && amount.length > 1) {
            if (amount.substring(0, 1) == 0 && amount.substring(1, 2) !== '.') {
                amount = amount.substring(1);
            }
        }
        const negativeSign = amount < 0 ? '-' : '';
        amount = amount ? amount : '';
        const str = ((decimalPlace && decimalPlace !== undefined) || decimalPlace == 0) ? parseFloat(parseFloat(amount).toFixed(parseInt(decimalPlace, null))).toString() : amount.toString();
        const idxOfDecimal = str.lastIndexOf(decimal);
        let intNumber = str;
        let decNumber = '';
        if (idxOfDecimal > 0) {

            intNumber = Math.abs(parseInt(str.substring(0, idxOfDecimal))).toString();
            decNumber = str.substring(idxOfDecimal);
        }
        intNumber = intNumber.split('').reverse().join('');
        let result = '';
        let l = Math.floor(intNumber.length / 3);
        if (intNumber.length % 3 > 0) { l++; }
        for (let i = 0; i < l; i++) {
            if (i > 0) { result += thousands; }
            if (i * 3 + 3 < intNumber.length) {
                result += intNumber.substring(i * 3, i * 3 + 3);
            } else {
                result += intNumber.substring(i * 3);
            }
        }
        let rsFinal = negativeSign + result.split('').reverse().join('').replace('-', '') + decNumber;
        if (rsFinal.indexOf('-,') >= 0) {
            rsFinal = rsFinal.replace('-,', '-');
        }
        return rsFinal;
    } catch (e) {
        console.log(e);
    }
}

Number.prototype.cformat = function (decimalPlace, decimal, thousands) {
    return format(this, decimal, thousands, decimalPlace)
};

String.prototype.cformat = function (decimalPlace, decimal, thousands) {
    return format(this, decimal, thousands, decimalPlace)
};

export function truncate(text: string, stop: number, clamp?: string) {
    return text.slice(0, stop) + (stop < text.length ? clamp || '...' : '')
}

export function generateId() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
            var r = (Math.random() * 16) | 0,
                v = c == "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        }
    );
}


export const presetRanges = [
    { label: "Today", value: [new Date(), new Date()] },
    {
        label: "Last 7 days",
        value: [subDays(new Date(), 6), new Date()],
    },
    {
        label: "Last 30 days",
        value: [
            subDays(new Date(), 30),
            new Date(),
        ],
    },
    {
        label: "Last 60 days",
        value: [
            subDays(new Date(), 60),
            new Date(),
        ],
    },
    {
        label: "Last 90 days",
        value: [
            subDays(new Date(), 90),
            new Date(),
        ],
    },
    {
        label: "Last 365 days",
        value: [
            subDays(new Date(), 365),
            new Date(),
        ],
    },
    {
        label: "Month to date",
        value: [startOfMonth(subMonths(new Date(), 0)), new Date()],

    }


];
export const dayNames = ref(["M", "T", "W", "TH", "F", "SA", "SU"]);