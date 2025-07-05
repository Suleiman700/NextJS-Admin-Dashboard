import { pool } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Get app languages
        const [languagesRows] = await pool.query(
            'SELECT value FROM app_settings WHERE setting_key = \'app_languages\''
        );

        const appLanguages = (languagesRows as any[])[0]?.value?.split(',') || [];
        const parsedAppLanguages = JSON.parse(appLanguages);

        // Get all translations
        const [translationsRows] = await pool.query('SELECT * FROM translations');

        // const translations = (translationsRows as any[]).reduce((acc, row) => {
        //     acc[row.key] = {
        //         ...acc[row.key],
        //         [row.language]: row.value
        //     };
        //     return acc;
        // }, {});

        return NextResponse.json({
            appLanguages: parsedAppLanguages,
            translationsRows
        });
    } catch (error) {
        console.error('Failed to fetch translations:', error);
        return NextResponse.json({ message: 'Failed to fetch translations' }, { status: 500 });
    }
}
