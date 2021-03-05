import styled from "styled-components";

const ErrorMessage = styled.div.attrs({
  className: `p-3 my-3 w-100 font-weight-bolder`,
})`
  background-color: ${(props) => props.error && "#dc3546b6"};
  background-color: ${(props) => props.success && "#28a745b6"};
`;

export default ErrorMessage;
