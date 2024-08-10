import styled from '@emotion/styled'
import { colors } from '@styles/colorPalette'

const Input = styled.input`
  padding: 0 16px;
  font-size: 15px;
  width: 100%;
  height: 48px;
  font-weight: 500;
  border: 1px solid ${colors.gray};
  border-radius: 8px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${colors.blue};
  }

  &[aria-invalid='true'] {
    border-color: ${colors.red};
  }
`

export default Input
