import { gql } from '@apollo/client';

export const GET_BANNER_IMAGE_SECTION = gql`
  query GetBannerImageSection {
    pageBy(uri: "/") {
      blocks {
        name
        attributesJSON
      }
    }
    mediaItems(first: 100) {
      nodes {
        id
        databaseId
        sourceUrl
        altText
      }
    }
  }
`;
