function List({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="absolute shadow-lg overflow-auto bg-white"
      style={{ width: '400px', maxHeight: '200px', top: '95%', left: '0' }}
    >
      <ul>{children}</ul>
    </div>
  );
}

export default List;
