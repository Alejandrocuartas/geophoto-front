import { gql } from '@apollo/client';

export const LOGIN_QUERY = gql`
  query Login($password: String!, $username: String!) {
    login(password: $password, username: $username) {
      id
      username
      jwt
    }
  }
`;

export const NEW_USER_MUTATION = gql`
  mutation Mutation($password: String!, $username: String!) {
    newUser(password: $password, username: $username) {
      id
      username
      jwt
    }
  }
`;

export const NEW_PHOTO_MUTATION = gql`
  mutation NewPhoto($input: NewPhoto!) {
    newPhoto(input: $input) {
      id
      url
      location {
        type
        coordinates
      }
      user {
        id
        username
      }
    }
  }
`;

export const PHOTOS_QUERY = gql`
  query Query($lat: String!, $long: String!) {
    photos(lat: $lat, long: $long) {
      id
      url
      location {
        type
        coordinates
      }
      user {
        id
        username
      }
    }
  }
`;