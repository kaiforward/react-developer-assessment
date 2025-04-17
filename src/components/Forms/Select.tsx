import { ChangeEventHandler } from "react";
import styled from "styled-components";

interface SelectProps {
    id: string;
    children: React.ReactNode;
    onChange: ChangeEventHandler<HTMLSelectElement>;
    value: string;
}

const StyledSelect = styled.select`
    border-radius: 8px;
    height: 44px;
    font-size: 16px;
    padding: 0 4px;
`

const Select: React.FC<SelectProps> = ({
    id,
    value,
    onChange,
    children
}) => {
    return(
        <StyledSelect id={id} onChange={onChange} value={value}>
          {children}
        </StyledSelect>
    )
}

export default Select;