import { cacheTag, cacheLife } from "next/cache";
import type { GitHubCommit } from "@/types/github";

export async function getLatestComits(): Promise<GitHubCommit[]> {
    'use cache'
    cacheTag('commits')
    cacheLife('commits')
    const res = await fetch('https://api.github.com/repos/Constantius-Kos/nextjs-practice-project/commits?per_page=5')
    if (!res.ok) {
        throw new Error('Помилка обробки запроса що до масиву комітів')
    }
    const data = res.json()
    return data
}