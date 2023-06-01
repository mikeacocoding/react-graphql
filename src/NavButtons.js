export const NavButtons = ({ start, end, next, previous, onPage }) => (
  <div className='d-flex justify-content-center my-2'>
    {previous && (
      <button className='btn mx-2 btn-sm btn-primary bi bi-arrow-left' onClick={() => onPage('last', 'before: "' + start + '"')}></button>
    )}
    {next && (
      <button className='btn mx-2 btn-sm btn-primary bi bi-arrow-right' onClick={() => onPage('first', 'after: "' + end + '"')}></button>
    )}
  </div>
);
