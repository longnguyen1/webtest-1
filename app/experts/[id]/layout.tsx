export default function ExpertLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <div>
        <h2>Featured experts section</h2>
      </div>
    </div>
  );
}
