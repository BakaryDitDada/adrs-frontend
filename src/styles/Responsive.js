import { css } from "styled-components"

const responsive = (props, media) => {

  if(media === "xs") {
    return css`
      @media (max-width: 28.75em) { 
        ${props} 
      };
    `;
  } else if(media === "sm") {
    return css`
      @media (max-width: 47.5em) { 
        ${props}
       };  
      // 760px -- 760/16 = 37.5em
    `;
  } else if(media === "md") {
    return css`
      @media (max-width: 56.25em) {
        ${props} 
      }; 
      // 900px -- 900/16 = 56.25em
    `;
  } else if(media === "lg") {
    return css`
      @media (max-width: 75em) { 
        ${props}
      };
      // 1200px -- 1200/16 = 75em
    `;
  } else if(media === "xl") {
    return css`
      @media (min-width: 112.5em) { 
        ${props}
      }; 
      // 1800px -- 1800/16 = 112.5em
    `;
  }

}

export default responsive;