import { default as React, Component } from 'react';
import { default as styled } from 'styled-components';
import changeCase from 'change-case';
import { default as FlashStore } from '../stores/flash';

interface Props {}
interface State {
  openedTab: string;
  flash: (string | null);
}

export class Header extends Component<Props, State> {
  onStoreChangeHandler: () => void;

  constructor(props: Props) {
    super(props);
    this.state = this.initialState;
    this.onStoreChangeHandler = this.onStoreChange.bind(this);
  }

  get initialState() {
    return { openedTab: 'home', flash: null };
  }

  componentDidMount() {
    FlashStore.onChange(this.onStoreChangeHandler);
  }

  componentWillUnmount() {
    FlashStore.offChange(this.onStoreChangeHandler);
  }

  onStoreChange() {
    const flash = FlashStore.getFlash('auth');
    this.setState({ flash });

    // レンダリング毎の表示は鬱陶しいので、componentDidUpdate() での alert は却下
    // prevState との比較は、同じミスを繰り返した時に表示できないので、componentDidMount(...prev) での alert は却下
    // onSubmit() 中では state の更新が間に合わないので、onSubmit() での alert は却下
    if (flash) alert(flash);
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
