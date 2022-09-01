
export default function Message({errors, loading}) {

  return (
    <>
      {errors && <p>Sorry, {errors}</p>}
      {loading && <p>Loading, please wait...</p>}
    </>
  );
}
