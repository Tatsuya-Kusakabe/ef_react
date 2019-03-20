import { default as React, Component } from 'react';
import { default as styled } from 'styled-components';
import changeCase from 'change-case';

interface Props {}
interface State {
  openedTab: string;
}

export class Header extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return { openedTab: 'home' };
  }

  onButtonClick(e: string) {
    this.setState({ openedTab: e });
  }

  render() {
    const iconNames = ['home', 'notifications', 'messages'];
    const iconElements = iconNames.map((icon: string) => {
      return (
        <Button
          key={icon} onClick={() => this.onButtonClick(icon)}
          isClicked={this.state.openedTab === icon}
        >
          {changeCase.pascalCase(icon)}
        </Button>
      );
    });

    return (
      <Wrapper>
        {iconElements}
      </Wrapper>
    );
  }
}

interface ButtonProps {
  isClicked: boolean;
}

const Wrapper = styled('div')`
  height: 48px;
  line-height: 48px;
  width: 100%;
  border-bottom: 2px solid rgba(0, 0, 0, 0.25);
  padding-left: 0;
  background-color: rgb(255, 255, 255);
`;

const Button = styled('div')`
  display: inline;
  margin: 0 10px;
  color: ${(props: ButtonProps) => props.isClicked ?  '#1DA1F2' : 'black'}
`;
