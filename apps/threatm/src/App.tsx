import { useState } from 'react';
import { Button } from '@deepfence/ui';
// import { Button } from 'ui'; // comment out to pick up from monorepo
import '@deepfence/ui/dist/style.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div>
        <label className="text-red-300">I am label</label>
        <Button color="primary" className="bg-red-700">
          Deefence UI Component override by user style of background red
        </Button>
      </div>
    </div>
  );
}

export default App;
