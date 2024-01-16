function List({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="shadow-lg overflow-auto"
      style={{ width: '400px', maxHeight: '200px' }}
    >
      <ul>{children}</ul>
    </div>
  );
}

export default List;
