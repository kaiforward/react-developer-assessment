import styled from "styled-components";

// Not sure if this is the correct type of pattern but could be extended to use all basic padding/margin properties
export const Spacer = styled.div<{
    $marginTop?: number;
    $marginBottom?: number;
    $paddingTop?: number;
    $paddingBottom?: number;
    $padding?: number;
    $margin?: number;
  }>`
    margin-top: ${props => `${props.$marginTop}px`};
    margin-bottom: ${props => `${props.$marginBottom}px`};
    padding-top: ${props => `${props.$paddingTop}px`};
    padding-bottom: ${props => `${props.$paddingBottom}px`};
    padding: ${props => `${props.$padding}px`};
    margin: ${props => `${props.$margin}px`};
`