const sessions = new Map<string, {email: string; userType: 'student' | 'university' | 'admin'}>();

export function createSession(email: string, userType: 'student' | 'university' | 'admin') {
    const sessionId = Math.random().toString(36).substring(2,15);
    sessions.set(sessionId, {email, userType});
    return sessionId;
}

export function getSession(sessionId: string) {
    return sessions.get(sessionId);
}

export function deleteSession(sessionId: string) {
    sessions.delete(sessionId);
}