import React from 'react';
import useFetchData from '../hooks/useFetchData';

const FetchingData = ({ query }) => {
  const { data, loading, error } = useFetchData(query);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return null; 
};

export default FetchingData;
