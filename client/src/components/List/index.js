/*
 * Package Import
 */
import{ useState, useEffect } from 'react';
import axios from 'axios';

/*
 * Local Import
 */
import * as S from './style';

const List = ({users}) => {
  console.log({ users });
  /*
   * Render
   */
  return (
  <S.ListContainer>
    {users.map(({ firstname, lastname}) => (
      <div>{`${firstname} ${lastname}`}</div>
    ))}
  </S.ListContainer>
);
};
export default List;
