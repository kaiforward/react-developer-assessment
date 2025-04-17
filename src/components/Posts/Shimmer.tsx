import styled from "styled-components";
import { Spacer } from "../GenericStyledComponents";

const ShimmerStyles = styled.div`
    position: relative;
    overflow: hidden;
    background-color: #eee;
    border-radius: 4px;
    &::after {
    content: "";
        position: absolute;
        top: 0;
        left: -150%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            to right,
            transparent 0%,
            rgba(255, 255, 255, 0.5) 50%,
            transparent 100%
        );
        animation: shimmer 1.2s infinite;
    }
`

const ShimmerWrapper = styled(Spacer) `
    border: solid thin #eee;
    border-radius: 16px;
`

const Shimmer: React.FC = () => {
    return(
        <ShimmerWrapper $padding={16}>
            <ShimmerStyles className="shimmer" style={{ height: '40px', width: '70%', marginBottom: '10px' }}></ShimmerStyles>
            <ShimmerStyles className="shimmer" style={{ height: '20px', width: '60%', marginBottom: '10px' }}></ShimmerStyles>
            <ShimmerStyles className="shimmer" style={{ height: '16px', width: '80%', marginBottom: '10px' }}></ShimmerStyles>
            <ShimmerStyles className="shimmer" style={{ height: '20px', width: '60%', marginBottom: '10px' }}></ShimmerStyles>
            <ShimmerStyles className="shimmer" style={{ height: '16px', width: '90%', marginBottom: '10px' }}></ShimmerStyles>
        </ShimmerWrapper>        
    )
}

export default Shimmer;