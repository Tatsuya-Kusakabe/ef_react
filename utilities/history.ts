import { createBrowserHistory } from 'history';

// ページをリロードしたら history.location.state を初期化する
// (https://stackoverflow.com/questions/47512104)
const history = createBrowserHistory();
if (history.location.state) history.replace({ ...history.location, state: {} });

export default history;
