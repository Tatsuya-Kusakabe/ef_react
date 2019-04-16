import { default as React, Component } from 'react';
import { default as styled } from 'styled-components';

interface WrapProps {
  color: string;
  colorOnHover: string;
  onClick: () => void;
}

interface Props {
  color: string;
  colorOnHover: string;
  name: string;
  onClick: () => void;
}

interface State {}

export class Button extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { color, colorOnHover } = this.props;
    return (
      <Wrapper color={color} colorOnHover={colorOnHover} onClick={() => this.props.onClick()}>
        {this.props.name}
      </Wrapper>
    );
  }
}

const Wrapper = styled('button')`
  width: 80%;
  height: 60px;
  margin: 20px 10% 0;
  background-color: ${(props: WrapProps) => props.color};
  color: white;
  font-size: 1em;
  transition: all 0.5s ease;

  &:hover {
    background-color: ${(props: WrapProps) => props.colorOnHover};
    cursor: pointer;
  }
`;
