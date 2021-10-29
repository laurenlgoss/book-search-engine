import { gql } from '@apollo/client';

export const GET_ME = gql`
    query getMe($id: ID, $username: String) {
        user(id: $id, username: $username) {
            _id
            username
            email
            password
            savedBooks {
                authors
                description
                bookId
                image
                link
                title
            }
        }
    }
`;