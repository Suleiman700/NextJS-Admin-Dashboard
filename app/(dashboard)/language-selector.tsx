'use client';

import { useState, useEffect } from 'react';
import { Check, Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { languageStorage } from '@/lib/storage';
import { useTranslations } from '@/lib/translations';
import { Select } from 'antd';

export function LanguageSelector() {
  const { t, setLanguage, language, appLanguages } = useTranslations();
  
  // Use the language from useTranslations hook instead of a separate state
  const [isOpen, setIsOpen] = useState(false);
  
  const languages = languageStorage.getAppLanguage();
  
  // Get display name for the current language
  const getCurrentLanguageName = () => {
    return languageStorage.getTranslations(language) || language.toUpperCase();
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
              <Globe className="h-5 w-5" />
              <span className="sr-only">Select Language</span>
            </Button>
          </DropdownMenuTrigger>
          
          {/* Ant Design Select - Only visible on mobile or as needed */}
          <div className="hidden">
            <Select
              value={language}
              onChange={(value) => {
                setLanguage(value);
                setIsOpen(false);
              }}
            >
              {appLanguages.map((lang) => (
                <Select.Option key={lang} value={lang}>
                  {lang.toUpperCase()}
                </Select.Option>
              ))}
            </Select>
          </div>

          <DropdownMenuContent align="end">
            {appLanguages.map((lang) => (
              <DropdownMenuItem
                key={lang}
                onClick={() => {
                  setLanguage(lang);
                  setIsOpen(false);
                }}
                className="flex items-center justify-between"
              >
                {languageStorage.getTranslations(lang) || lang.toUpperCase()}
                {language === lang && (
                  <Check className="h-4 w-4 ml-2" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        {getCurrentLanguageName()}
      </TooltipContent>
    </Tooltip>
  );
}
