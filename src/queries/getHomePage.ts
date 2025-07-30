import { gql } from '@apollo/client';

export const GET_HOME_PAGE_HERO = gql`
  query GetHomePageHero {
    pageBy(uri: "/") {
      id
      acf {
        hero_image {
          sourceUrl
          altText
        }
        hero_title
      }
    }
  }
`;