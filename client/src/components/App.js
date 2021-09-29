/*
 * Package Import
 */
import{ useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

/*
 * Local Import
 */
import List from './List';
import * as S from './style';

const App = () => {
  /*
   * Hooks
   */
  const { isLoading, error, data } = useQuery(
    'users',
    async () => {
      const { data } = await axios.get('/api/users/find');
      return data
    }
  );

  console.log({ data });
  /*
   * Render
   */
  return (
  <S.Container>
    {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <List users={data} />
      )}
  </S.Container>
);
};
export default App;
