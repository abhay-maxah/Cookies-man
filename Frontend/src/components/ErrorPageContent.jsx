// eslint-disable-next-line react/prop-types
function ErrorPageContain({ title, children }) {
  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  );
}
export default ErrorPageContain;
