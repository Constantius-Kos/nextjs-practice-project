import { auth } from "@/app/lib/auth"
import LoginButton from "./LoginButton"
async function LoginButtonContainer() {

    const session = await auth()

    return (
        <div className="w-full h-full items-center justify-end  flex ">
            <LoginButton session={session} />
        </div>
    )
}

export default LoginButtonContainer