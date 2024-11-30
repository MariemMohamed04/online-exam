import { getServerSession } from "next-auth";
import { authOptions } from "@utils/options";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <>
    { session ? (
    <div>
        <h1 className="text-5xl">Welcome</h1>
    </div>
    ) : (
      <div>
        <h1 className="text-5xl">You Shall Not Pass!</h1>
      </div>
    )

    }
    </>
  );
}