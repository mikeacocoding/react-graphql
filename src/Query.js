const githubQuery = (pageCount, queryString) => ({
  query: `
    {
      viewer {
        name
      }
      search(
        query: "${queryString} user:mikeacocoding sort:updated-desc"
        type: REPOSITORY
        first: ${pageCount}
      ) {
        repositoryCount
        nodes {
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
    }
  `,
});
//planetoftheweb

export default githubQuery;
