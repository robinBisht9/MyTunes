const UserInput = ({ query, setQuery, number, setNumber, handleGenerate }) => {
  return (
    <>
      <div className="row justify-content-md-center">
        <div className="col-6">
          <input
            type="text"
            aria-label="Query"
            className="form-control"
            placeholder="Enter your feeling or mood"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="col-2">
          <input
            type="number"
            aria-label="Number"
            className="form-control"
            placeholder="Enter how many songs to generate"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <div className="col-2">
          <button className="btn btn-success" onClick={() => handleGenerate()}>
            Generate
          </button>
        </div>
      </div>
    </>
  );
};

export default UserInput;
