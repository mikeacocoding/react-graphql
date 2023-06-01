export const RepoInfo = ({ repo }) => {
  const licenseObj = {
    class: 'btn-outline-success',
    value: repo.licenseInfo?.spdxId,
  };

  if (!repo.licenseInfo?.spdxId) {
    licenseObj.class = 'btn-danger';
    licenseObj.value = 'NO LICENSE';
  } else if (repo.licenseInfo.spdxId === 'NOASSERTION') {
    licenseObj.class = 'btn-warning';
  }

  return (
    <li className='list-group-item' key={repo.id.toString()}>
      <div className='d-flex justify-content-between align-items-center'>
        <div className='d-flex flex-column'>
          <a className='h5 mb text-decoration-none' href={repo.url} target='_blank'>
            {repo.name}
          </a>
          <p className='small'>{repo.description}</p>
        </div>
        <div className='text-nowrap ms-3'>
          <span className={`px-1 py-0 ms-1 d-inline-block btn btn-sm ${licenseObj.class}`} style={{ fontSize: '.6em' }}>
            {licenseObj.value}
          </span>
          <span
            className={`px-1 py-0 ms-1 d-inline-block btn btn-sm ${
              repo.viewerSubscription === 'SUBSCRIBED' ? 'btn-success' : 'btn-outline-secondary'
            }`}
            style={{ fontSize: '.6em' }}
          >
            {repo.viewerSubscription}
          </span>
        </div>
      </div>
    </li>
  );
};
