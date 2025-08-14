// lib/session.ts
import crypto from 'crypto';
import Session from './models/session';
import connect from './db';

export async function createSession(email: string, userType: 'student' | 'university' | 'admin') {
    try {
        // Generate secure session ID
        const sessionId = crypto.randomBytes(32).toString('hex');
        const now = new Date();
        const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours
        
        await connect();
        
        // Delete any existing sessions for this user (optional - for single session per user)
        await Session.deleteMany({ email, userType });
        
        // Create new session in database
        const session = new Session({
            _id: sessionId,
            email,
            userType,
            createdAt: now,
            expiresAt
        });
        
        await session.save();
        
        return sessionId;
    } catch (error) {
        console.error('Session creation error:', error);
        throw error;
    }
}

export async function getSession(sessionId: string) {
    try {
        if (!sessionId) return null;
        
        await connect();
        
        // Find session in database
        const session = await Session.findById(sessionId);
        
        if (!session) return null;
        
        // Check if session is expired
        if (new Date() > session.expiresAt) {
            await deleteSession(sessionId);
            return null;
        }
        
        return {
            email: session.email,
            userType: session.userType
        };
    } catch (error) {
        console.error('Session retrieval error:', error);
        return null;
    }
}

export async function deleteSession(sessionId: string) {
    try {
        if (!sessionId) return;
        
        await connect();
        await Session.findByIdAndDelete(sessionId);
    } catch (error) {
        console.error('Session deletion error:', error);
    }
}

// Helper function to delete all sessions for a user (useful for logout from all devices)
export async function deleteAllUserSessions(email: string, userType: string) {
    try {
        await connect();
        await Session.deleteMany({ email, userType });
    } catch (error) {
        console.error('Delete all sessions error:', error);
    }
}

// Helper function to extend session expiry
export async function refreshSession(sessionId: string) {
    try {
        await connect();
        const newExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // Extend by 24 hours
        
        await Session.findByIdAndUpdate(sessionId, {
            expiresAt: newExpiresAt
        });
    } catch (error) {
        console.error('Session refresh error:', error);
    }
}