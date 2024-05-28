export interface SessionInfos {
    accountId: string | null | undefined
    userId: string | null | undefined
    name: string | null | undefined
    email: string | null | undefined
    role: "admin" | "basic",
    sessionId: string | null | undefined,
    sessionExpires: Date | undefined
}
