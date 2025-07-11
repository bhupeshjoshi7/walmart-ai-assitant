import React from 'react';
import { useColor } from './ContextProvider';  // Corrected import

function ComponentA() {
  const { colorToggle } = useColor();  // Access the colorToggle function from the context

  return (
    <div>
      <h1>componentA</h1>
      <button onClick={colorToggle}>Toggle Color</button>
    </div>
  );
}

export default ComponentA;
