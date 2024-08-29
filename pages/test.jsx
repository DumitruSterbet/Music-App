import React from 'react';
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';

const fetchTestData = async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
  return response.data;
};

const TestPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['testData'],
    queryFn: fetchTestData,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Test Page</h1>
      <p>This page is using the global setup from _app.js.</p>
      <div>
        <h2>Fetched Data:</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
      <button onClick={() => alert('Button Clicked!')}>Click Me</button>
    </div>
  );
};

export default TestPage;
