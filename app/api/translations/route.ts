import { pool } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const model = url.searchParams.get('model'); // getAppLanguages / getTranslations / none

        if (!model) {
            return NextResponse.json({ message: 'No model provided' }, { status: 400 });
        }
        else if (model == 'getAppLanguages') {
            // Get app languages
            const [languagesRows] = await pool.query(
                'SELECT value FROM app_settings WHERE setting_key = \'app_languages\''
            );

            const appLanguages = (languagesRows as any[])[0]?.value?.split(',') || [];
            const parsedAppLanguages = JSON.parse(appLanguages);

            return NextResponse.json({
                appLanguages: parsedAppLanguages,
            });
        }
        else if (model == 'getTranslations') {
            const langCode = url.searchParams.get('langCode') ?? 'en'; // E.g. en

            // Get all translations
            const [translationsRows] = await pool.query(`SELECT sentence_key, ${langCode} as sentence FROM translations`);

            const result = {};
            translationsRows.forEach((item) => {
                result[item.sentence_key] = item.sentence;
            });

            return NextResponse.json({
                translations: result,
            });
        }


    }
    catch (error) {
        console.error('Failed to fetch translations:', error);
        return NextResponse.json({ message: 'Failed to fetch translations' }, { status: 500 });
    }
}
