class Storage {
    private prefix: string = 'BrightPixelCRM';

    constructor(prefix: string) {
        this.prefix = prefix;
    }

    public get(key: string): any {
        if (typeof window === 'undefined') return null;
        const value = localStorage.getItem(`${this.prefix}_${key}`);
        return value ? JSON.parse(value) : null;
    }

    public set(key: string, value: any): void {
        if (typeof window === 'undefined') return;
        localStorage.setItem(`${this.prefix}_${key}`, JSON.stringify(value));
    }
}

class Storage_Language extends Storage {

    constructor() {
        super('Languages');
    }

    public setAppLanguage(language: string): void {
        this.set('AppLanguages', language);
    }
    public getAppLanguage(): string | null {
        return this.get('AppLanguages');
    }

    public setViewLanguage(value: string): void {
        this.set('ViewLanguages', value);
    }
    public getViewLanguage(): string | null {
        return this.get('ViewLanguages');
    }

    public setTranslations(translations: any): void {
        this.set('Translations', translations);
    }
    public getTranslations(): any | null {
        return this.get('Translations');
    }
}

export const languageStorage = new Storage_Language();
