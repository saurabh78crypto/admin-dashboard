import './App.css';
import useFetchData from './hooks/useFetchData';
import DataTable from './components/DataTable'; 
import FetchingData from './components/FetchingData';

function App() {
  const {data, loading, error} = useFetchData(); 

    if(loading) return <div className='loading-spinner'></div>

    if(error) return(
      <div className='error-notification'>
        <i className='fas fa-exclamation-triangle icon'></i>
        <h2>Error!</h2>
        <p>{error.message}</p>
      </div>
    );

     const columns = [
      { Header: 'Ratings Average', accessor: 'ratings_average' },
      { Header: 'Author Name', accessor: 'author_name' },
      { Header: 'Title', accessor: 'title' },
      { Header: 'First Publish Year', accessor: 'first_publish_year' },
      { Header: 'Subject', accessor: 'subject[0]' },
      { Header: 'Author Birth Date', accessor: 'birth_date' },
      { Header: 'Author Top Work', accessor: 'top_work' },
    ];

  return (
        <div className="App">
          <FetchingData/>
          <DataTable columns={columns} data={data} />
        </div>
  );
}

export default App;
