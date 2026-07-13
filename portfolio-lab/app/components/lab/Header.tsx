import { signIn, signOut, auth, } from "@/app/lib/auth"

import Status from "./Status"
import LoginButton from "./LoginButton";


async function Header() {
    const session = await auth()
    console.log('session:', session);
    return (
        <div className="debug-green p-1 hidden  items-center justify-center lg:grid lg:grid-cols-3 gap-3  lg:w-full lg:h-16">
            <div className="debug-red h-full flex items-center"><span className="debug-purple font-mono text-amber-500 ml-4">[LAB_v1.0]</span></div>
            <div className="debug-red  h-full flex items-center justify-center ">
                <Status />
            </div>

            <div className="debug-red flex h-full items-center justify-end pr-10 ">
                <LoginButton session={session} />
            </div>
            {/* {session ?
                (<form action={async () => {
                    "use server"
                    await signOut()
                }}>
                    <button type="submit"> Log Out </button>
                </form>) : (<form action={async () => {
                    "use server"
                    await signIn("github")
                }}>
                    <button type="submit">Log In</button>
                </form>)} */}
        </div>
    )
}

export default Header