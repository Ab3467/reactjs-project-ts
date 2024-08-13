import React, { useState, useEffect} from 'react';

const File: React.FC = () => {
  const [count, setCount] = useState(0);

  let data : number;
  
  useEffect(() => {
    data = count;
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <p>Data : {data}</p>
      <button onClick={() => setCount(prevState => prevState + 1)}>Increment</button>
    </div>
  );
};

export default File;
