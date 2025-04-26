import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  
  return (
    <main>
      <h2>Hello ss {session && <span>{session.user!.name}</span>}</h2>
    </main>
  );
}
