'use client'
import { useState } from "react"
import { loginWithGithub, loginWithGoogle, logout } from "@/app/lib/actions"
import type { Session } from "next-auth"
interface LoginButtonProps {
    session: Session | null
}
function LoginButton({ session }: LoginButtonProps) {
    const [isOpen, setIsopen] = useState<boolean>(false)
    function clickHandler() {
        if (session) {
            logout()
        } else {
            setIsopen(true)
        }
    }
    console.log(session);
    return (
        <>
            {session && <div className="pr-2">{session.user.email}</div>}

            <button className="debug-purple" onClick={() => clickHandler()}>{session ? 'Log Out' : 'Login'}</button>
            {isOpen && <div className="fixed z-50 inset-0  flex justify-center items-center bg-black/70" onClick={() => setIsopen(!isOpen)}>
                <div className="border border-gold-amber/70 shadow-[0_0_30px_-10px_var(--gold-deep)] rounded-lg flex flex-col h-80 w-100 items-center justify-center gap-10 bg-black/90 backdrop-blur-md font-jetBrains-mono" onClick={(e) => e.stopPropagation()}>


                    <button className="w-64 px-6 py-3 font-jetBrains-mono text-sm tracking-wider uppercase text-gold-amber bg-zinc-950/65 border border-gold-amber/40 hover:border-gold-amber hover:text-gold hover:bg-gold-amber/10 hover:shadow-[0_0_15px_rgba(245,158,11,0.25)] transition-all duration-300 rounded-md cursor-pointer before:content-[''] hover:before:content-['>_'] before:mr-2 before:text-gold
" onClick={() => loginWithGithub()}>Ligin via GitHub</button>
                    <button className="w-64 px-6 py-3 font-jetBrains-mono text-sm tracking-wider uppercase text-gold-amber bg-zinc-950/65 border border-gold-amber/40 hover:border-gold-amber hover:text-gold hover:bg-gold-amber/10 hover:shadow-[0_0_15px_rgba(245,158,11,0.25)] transition-all duration-300 rounded-md cursor-pointer before:content-[''] hover:before:content-['>_'] before:mr-2 before:text-gold
" onClick={() => loginWithGoogle()}>Login via Google</button>
                </div>
            </div>}
        </>
    )
}

export default LoginButton