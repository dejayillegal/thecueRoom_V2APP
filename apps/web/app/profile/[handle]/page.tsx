interface Params { handle: string }

export default function ProfilePage({ params }: { params: Params }) {
  return <main className="p-4">Profile: {params.handle}</main>;
}
