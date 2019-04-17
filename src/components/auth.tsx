import { default as React, Component } from 'react';
import { default as styled } from 'styled-components';
import { AuthLabel as Label } from '../utilities/types';
import { Header } from './header';
import { Input } from './input';
import { Button } from './button';
import { default as AuthAction } from '../actions/auth';

interface Props {
  status: 'signIn' | 'signUp';
}

interface State {
  name: string;
  email: string;
  password: string;
  passwordConf: string;
}

export class Auth extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { name: '', email: '', password: '', passwordConf: '' };
  }

  get labelArr(): Label[] {
    return (this.props.status === 'signUp')
      ? ['name', 'email', 'password', 'passwordConf']
      : ['email', 'password'];
  }

  onSubmit(): void {
    const { name, email, password, passwordConf } = this.state;
    const { status } = this.props;
    const passwordLength = 8;

    if (status === 'signUp' && name === '') {
      alert('名前を入力してください。');
      return;
    }
    if (email === '') {
      alert('メールアドレスを入力してください。');
      return;
    }
    if (!email.match(/(.+)@([^.]+)\.([^.]+)/)) {
      alert('メールアドレスの形式に誤りがあります。');
      return;
    }
    if (password === '') {
      alert('パスワードを入力してください。');
      return;
    }
    if (password.length < passwordLength) {
      alert(`パスワードは ${passwordLength} 文字以上にしてください。`);
      return;
    }
    if (status === 'signUp' && passwordConf === '') {
      alert('確認用のパスワードを入力してください。');
      return;
    }
    if (status === 'signUp' && password !== passwordConf) {
      alert('パスワードが一致していません。');
      return;
    }

    status === 'signUp'
      ? AuthAction.signUp(name, email, password)
      : AuthAction.signIn(email, password);
  }

  onInputChange(label: Label, value: string): void {
    this.setState({ [label]: value } as Pick<State, Label>);
  }

  render() {
    const inputElemArr = this.labelArr.map((enLabel: Label) => {
      return (
        <Input
          enLabel={enLabel} key={enLabel} value={this.state[enLabel]}
          onInputChange={(label: Label, value: string) => this.onInputChange(label, value)}
        />
      );
    });

    return (
      <Wrapper>
        <Header />
        <AuthCard status={this.props.status}>
          { inputElemArr }
          <Button
            color="#1CB84D" colorOnHover="#00C73C"
            name="ログイン" onClick={() => this.onSubmit()}
          />
        </AuthCard>
      </Wrapper>
    );
  }
}

const Wrapper = styled('div')`
  height: 100vh;
  width: 100vw;
  background-color: rgb(230, 236, 240);
`;

const AuthCard = styled('div')`
  height: ${(props: Props) => props.status === 'signUp' ? '420px' : '260px'};
  width: 300px;
  margin: 0 auto;
  background: white;
  margin-top: 100px;
`;
