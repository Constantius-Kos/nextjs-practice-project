'use client'
import { useState } from "react"
import { loginWithGithub, loginWithGoogle, logout } from "@/app/lib/actions"
import type { Session } from "next-auth"
import Image from "next/image"

interface LoginButtonProps {
    session: Session | null
}

function LoginButton({ session }: LoginButtonProps) {
    const [isOpenLoginModal, setIsopenLoginModal] = useState<boolean>(false)
    function clickHandler() {
        if (session) {
            logout()
        } else {
            setIsopenLoginModal(true)
        }
    }
    // console.log(session);
    return (
        <>
            {/* Ататарка + емейл на десктопе */}
            {session && <div className=" flex    " >
                {session?.user?.image && <Image src={session.user.image} width={24} height={24} alt={'avatar'} className="rounded-full mr-2" />}
                <div className="pr-2 hidden lg:flex ">{session.user.email}</div>
            </div>}
            {/* Тільки аватарка на мобільному */}
            {/* {session?.user.image && <Image src={session.user.image} width={24} height={24} alt={'avatar'} className="debug-purple rounded-full lg:hidden mr-2" />} */}

            <button className="" onClick={() => clickHandler()}>{session ? 'Log Out' : 'Login'}</button>
            {/* Модалка з варіантами логіну */}
            {isOpenLoginModal && <div className="fixed z-50 inset-0  flex justify-center items-center bg-black/70" onClick={() => setIsopenLoginModal(!isOpenLoginModal)}>
                <div className="border border-gold-amber/70 shadow-[0_0_30px_-10px_var(--gold-deep)] rounded-lg flex flex-col w-[90dvw] h-[90dvw] lg:h-80 lg:w-100 items-center justify-center gap-10 bg-black/90 backdrop-blur-md font-jetBrains-mono" onClick={(e) => e.stopPropagation()}>


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