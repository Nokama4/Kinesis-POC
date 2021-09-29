/*
 * Package Import
 */
import styled from '@emotion/styled';

/*
 * Components
 */

export const Container = styled.div({
  height: '100%',
  width: '100%',
});

export const UsersContainer = styled.ul({
  width:' 70%',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-evenly',
  margin: '10em auto 0',
});

export const UserThumb = styled.li({
  width: '7em',
  height: '7em',
  margin: '2em',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '6px',
  border: '2px grey solid',
  padding: '1em',
  fontSize: '0.7em',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
});

export const Avatar = styled.img({
  width: '4em',
  height: '4em'
});
