"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="flex border border-gold-deep/50 p-2 px-4 rounded-lg text-gold-deep hover:bg-gold-deep/10 transition-colors cursor-pointer font-jetBrains-mono"
        >
            ← Back
        </button>
    );
}
