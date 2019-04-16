import { default as React, Component } from 'react';
import { default as styled } from 'styled-components';
import { AuthLabel } from '../utilities/types';

interface Props {
  enLabel: AuthLabel;
  value: string;
  onInputChange: (label: AuthLabel, value: string) => void;
}

interface State {}

export class Input extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  get jpLabel(): string {
    const { enLabel } = this.props;
    return (enLabel === 'name') ? '名前'
      : (enLabel === 'email') ? 'メールアドレス'
      : (enLabel === 'password') ? 'パスワード'
      : (enLabel === 'passwordConf') ? 'パスワード（確認用）'
      : 'エラー';
  }

  get type(): string {
    const { enLabel } = this.props;
    return (enLabel === 'name') ? 'text'
      : (enLabel === 'email') ? 'text'
      : (enLabel === 'password') ? 'password'
      : (enLabel === 'passwordConf') ? 'password'
      : 'error';
  }

  render() {
    return (
      <Wrapper>
        <label>{this.jpLabel}</label>
        <input
          type={this.type} value={this.props.value}
          onChange={(e: any) => this.props.onInputChange(this.props.enLabel, e.target.value)}
        />
      </Wrapper>
    );
  }
}

const Wrapper = styled('div')`
  height: 80px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  input { width: 80%; margin-top: 5px; }
`;
