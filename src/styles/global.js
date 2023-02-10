import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`


*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body{
    font-family: 'Roboto', sans-serif;
}

ul {
    list-style: none;
}

li{
    display: flex;
    align-items: center;
    gap: 0.9375rem;
}

a{
    text-decoration: none;
}
`;

export default GlobalStyles;
