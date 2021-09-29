/*
 * Package Import
 */
import{ useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import PropTypes from 'prop-types';

/*
 * Local Import
 */
import * as S from './style';

const List = ({ usersIds, userById }) => {
  /*
   * Hooks
   */
  const { isLoading, error, data } = useQuery(
    'chats',
    async () => {
      const { data } = await axios.get('/api/chats/find');
      return data
    }
  );

console.log({ data });
  /*
   * Render
   */
  return (
  <S.ListContainer>
    <S.ChatsContainer>

    </S.ChatsContainer>
    <S.UsersContainer>
      {usersIds?.map((id) => {
        // Get name data
        const { firstname, lastname } = userById[id];

        return (
        <S.Item tabIndex="0" key={lastname}>
          {`${firstname} ${lastname}`}
        </S.Item>
      )})}
    </S.UsersContainer>
  </S.ListContainer>
);
};

List.propTypes = {
  usersIds: PropTypes.array.isRequired,
  userById: PropTypes.object.isRequired
};

export default List;
