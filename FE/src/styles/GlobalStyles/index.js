import "./GlobalStyles.scss";
const GlobalStyles = ({ children }) => {
    return children;
};
const currencyFormat = (num) => {
    return "₫" + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
};
const compactNumber = (value) => {
    const suffixes = ["", "k", "m", "b", "t"];
    const suffixNum = Math.floor(("" + value).length / 3.5);

    let shortValue = parseFloat(
        (suffixNum !== 0
            ? value / Math.pow(1000, suffixNum)
            : value
        ).toPrecision(3),
    );
    if (shortValue % 1 !== 0) {
        shortValue = shortValue.toFixed(1);
    }
    return shortValue + suffixes[suffixNum];
};
const formatDate = (date) => {
    var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
};
export { currencyFormat, compactNumber, formatDate };
export default GlobalStyles;
