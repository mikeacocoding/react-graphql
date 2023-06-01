import { useCallback, useEffect, useState } from 'react';
import github from './db.js';
import githubQuery from './Query.js';
import { RepoInfo } from './RepoInfo.js';
import { SearchBox } from './SearchBox.js';

function App() {
  const [userName, setUserName] = useState('');
  const [repoList, setRepoList] = useState(null);
  const [pageCount, setPageCount] = useState(10);
  const [queryString, setQueryString] = useState('');
  const [totalCount, setTotalCount] = useState(null);

  const fetchData = useCallback(() => {
    const queryText = JSON.stringify(githubQuery(pageCount, queryString));

    fetch(github.baseURL, {
      method: 'POST',
      headers: github.headers,
      body: queryText,
    })
      .then(response => response.json())
      .then(({ data }) => {
        const { viewer, search } = data;
        const repos = search.nodes;
        const total = search.repositoryCount;

        setUserName(viewer.name);
        setRepoList(repos);
        setTotalCount(total);
      });
  }, [pageCount, queryString]);

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
            <RepoInfo key={repo.id} repo={repo} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
