import "./GlobalStyles.scss";
const GlobalStyles = ({ children }) => {
    return children;
};
const currencyFormat = (num) => {
    return "₫" + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
};
export { currencyFormat };
export default GlobalStyles;
