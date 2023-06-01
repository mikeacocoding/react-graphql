const githubQuery = (pageCount, queryString, paginationKeyWord, paginationString) => ({
  query: `
    {
      viewer {
        name
      }
      search(
        query: "${queryString} user:mikeacocoding sort:updated-desc"
        type: REPOSITORY
        ${paginationKeyWord}: ${pageCount}
        ${paginationString}
      ) {
        repositoryCount
        edges {
          cursor
          node {
            ... on Repository {
              name
              description
              id
              url
              viewerSubscription
              licenseInfo {
                spdxId
              }
            }
          }
        }
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
      }
    }
  `,
});
//planetoftheweb

export default githubQuery;
