import { auth } from "@/app/lib/auth"
import LoginButton from "./LoginButton"
async function LoginButtonContainer() {

    const session = await auth()

    return (
        <div className="w-full flex flex-1 h-full items-center justify-end   ">
            <LoginButton session={session} />
        </div>
    )
}

export default LoginButtonContainer