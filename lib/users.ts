import { pool } from '@/lib/db';

export async function getUserByEmail(email: string) {
    const [rows] = await pool.query(
        'SELECT id, username, email, password FROM users WHERE email = ? LIMIT 1',
        [email]
    );
    return (rows as any[])[0] ?? null;
}
