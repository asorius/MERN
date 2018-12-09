import React from 'react';
export default function Spinner() {
  return (
    // <div>
    //   <img
    //     src={spinner}
    //     alt="Loading..."
    //     style={{ width: '200px', margin: 'auto', display: 'block' }}
    //   />
    // </div>
    <div className="py-3 text-center">
      <i className="fas fa-cog fa-spin fa-2x" />
    </div>
  );
}
