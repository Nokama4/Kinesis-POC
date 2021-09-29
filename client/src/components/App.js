/*
 * Package Import
 */
import{ useContext, useState, useEffect } from 'react';
import Loader from "react-loader-spinner";
import { useQuery } from 'react-query';
import axios from 'axios';

/*
 * Local Import
 */
import List from './List';
import { AuthContext } from '../context/Auth';
import { withAuth } from '../context/Auth/withAuth';
import * as S from './style';

/*
 * Component
 */
const App = () => {
  const { user, setUser } = useContext(AuthContext);
  /*
   * State
   */
  const [isSelected, setSelected] = useState(false);

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

  /*
   * Handlers
   */
   const onClick = (id) => () => {
     setUser(id);
     setSelected(true)
   }

  /*
   * LifeCycles
   */
  useEffect(() => {
    if (user?.length) {
      setSelected(true);
    }
  }, [user]);

  /*
   * Render
   */
  return (
  <S.Container>
    {/* Loader */}
    {isLoading && !isSelected && (
      <Loader
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%'
        }}
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
      />
      )}

    {/* Select user */}
    {!isLoading && !isSelected && (
      <S.UsersContainer>
        {data.usersIds.map((id) => {
          // Get name data
          const { firstname, lastname, avatar } = data.userById[id];

          return (
          <S.UserThumb
            tabIndex="0"
            key={lastname}
            onClick={onClick(id)}
          >
            <S.Avatar aria-label="Avatar" src={avatar}/>
            {`${firstname}`} <br /> {`${lastname}`}
          </S.UserThumb>
        )})}
    </S.UsersContainer>
    )}


    {/* App */}
      {isSelected && !isLoading && (
        <List usersIds={data.usersIds} userById={data.userById} />
      )}
  </S.Container>
);
};
export default withAuth(App);
