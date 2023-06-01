import { useCallback, useEffect, useState } from 'react';
import github from './db.js';
import githubQuery from './Query.js';
import { RepoInfo } from './RepoInfo.js';
import { SearchBox } from './SearchBox.js';
import { NavButtons } from './NavButtons.js';

function App() {
  const [userName, setUserName] = useState('');
  const [repoList, setRepoList] = useState(null);
  const [pageCount, setPageCount] = useState(10);
  const [queryString, setQueryString] = useState('');
  const [totalCount, setTotalCount] = useState(null);

  const [startCursor, setStartCursor] = useState(null);
  const [endCursor, setEndCursor] = useState(null);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [paginationKeyword, setPaginationKeyword] = useState('first');
  const [paginationString, setPaginationString] = useState('');

  const fetchData = useCallback(() => {
    const query = githubQuery(pageCount, queryString, paginationKeyword, paginationString);
    const queryText = JSON.stringify(query);

    console.log(query);
    fetch(github.baseURL, {
      method: 'POST',
      headers: github.headers,
      body: queryText,
    })
      .then(response => response.json())
      .then(({ data }) => {
        const { viewer, search } = data;
        const repos = search.edges;
        const total = search.repositoryCount;
        const start = search.pageInfo?.startCursor;
        const end = search.pageInfo?.endCursor;
        const next = search.pageInfo?.hasNextPage;
        const prev = search.pageInfo?.hasPreviousPage;

        setUserName(viewer.name);
        setRepoList(repos);
        setTotalCount(total);

        setStartCursor(start);
        setEndCursor(end);
        setHasNextPage(next);
        setHasPreviousPage(prev);
      });
  }, [pageCount, queryString, paginationKeyword, paginationString]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className='App container mt-5'>
      <h1 className='text-primary'>
        <i className='bi bi-diagram-2-fill'></i> Repos
      </h1>
      <p>Hey there {userName}</p>
      <SearchBox
        totalCount={totalCount}
        pageCount={pageCount}
        queryString={queryString}
        onTotalChange={myNumber => setPageCount(myNumber)}
        onQueryChange={myString => setQueryString(myString)}
      />
      {repoList && (
        <ul className='list-group list-group-flush'>
          {repoList.map(repo => (
            <RepoInfo key={repo.node.id} repo={repo.node} />
          ))}
        </ul>
      )}
      <NavButtons
        start={startCursor}
        end={endCursor}
        next={hasNextPage}
        previous={hasPreviousPage}
        onPage={(myKeyword, myString) => {
          setPaginationKeyword(myKeyword);
          setPaginationString(myString);
        }}
      />
    </div>
  );
}

export default App;
