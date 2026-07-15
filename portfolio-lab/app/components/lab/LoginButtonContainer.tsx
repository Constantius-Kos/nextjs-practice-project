import { auth } from "@/app/lib/auth"
import LoginButton from "./LoginButton"
async function LoginButtonContainer() {

    const session = await auth()
    return (
        <div>
            <LoginButton session={session} />
        </div>
    )
}

export default LoginButtonContainer