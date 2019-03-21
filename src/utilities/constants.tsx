class BaseActionTypes {
  POST__FETCH_POSTS: 'POST__FETCH_POSTS' = 'POST__FETCH_POSTS';
}

export const ActionTypes = new BaseActionTypes();

export const Host = {
  server: { dev: 'http://localhost:3001' },
  client: { dev: 'http://localhost:3000' },
};
