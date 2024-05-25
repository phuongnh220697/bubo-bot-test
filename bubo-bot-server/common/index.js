
module.exports = {
    getCurrentDateTime: () => {
        const now = new Date();
        const formatNumber = (num) => String(num).padStart(2, '0');
        
        return `${now.getFullYear()}${formatNumber(now.getMonth() + 1)}${formatNumber(now.getDate())}${formatNumber(now.getHours())}${formatNumber(now.getMinutes())}${formatNumber(now.getSeconds())}`;
    }
}