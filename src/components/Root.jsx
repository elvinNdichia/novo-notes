export function Root() {
  return (
    <>
      Welcome to the Root{" "}
      <button
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
      >
        Logout
      </button>
    </>
  );
}
