export function formatNumber(num: any) {
    if (num >= 1000000) {
        return Math.floor(num / 100000) / 10 + "M";
    } else if (num >= 100000) {
        return Math.floor(num / 100000) / 10 + "M";
    }
    return num.toString();
}