const Spinner = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', position: 'fixed', top: 0, left: 0, width: '100%' }}
    >
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
 export default Spinner;