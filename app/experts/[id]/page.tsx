export default async function Expert({ params }: { params: { id: string } }) {
  const { id } = await params;
  return <h1>Expert Nice: {id}</h1>;
}
