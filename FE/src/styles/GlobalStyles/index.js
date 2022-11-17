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
export { currencyFormat, compactNumber };
export default GlobalStyles;
