export default async function DrawingPadPage({
  params,
}: {
  params: { slug: string }
}) {
  console.log(params)
  return <div>canvas page</div>
}
