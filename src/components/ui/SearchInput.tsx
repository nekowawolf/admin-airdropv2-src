import React, { InputHTMLAttributes, useState, useEffect } from 'react';
import { GoSearch } from "react-icons/go";
import { CgClose } from "react-icons/cg";
import { cn } from "@/lib/utils";
import Fuse from 'fuse.js';

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  wrapperClassName?: string;
  clearButtonClassName?: string;
  iconClassName?: string;
  searchIconClassName?: string;
  onClear?: () => void;
  suggestionData?: any[];
  suggestionKey?: string;
  onSuggestionClick?: () => void;
}

export function SearchInput({ 
  value, 
  onChange, 
  placeholder = "Search...", 
  className, 
  wrapperClassName,
  clearButtonClassName,
  iconClassName,
  searchIconClassName,
  onClear,
  suggestionData,
  suggestionKey,
  onSuggestionClick,
  ...props 
}: SearchInputProps) {
  
  const [suggestion, setSuggestion] = useState<string | null>(null);

  useEffect(() => {
    if (!value || !suggestionData || suggestionData.length === 0 || !suggestionKey) {
      setSuggestion(null);
      return;
    }

    const exactMatchExists = suggestionData.some(item => {
      const val = item[suggestionKey];
      return typeof val === 'string' && val.toLowerCase().includes(value.toLowerCase());
    });

    if (exactMatchExists) {
      setSuggestion(null);
      return;
    }

    const fuse = new Fuse(suggestionData, {
      keys: [suggestionKey],
      threshold: 0.4,
    });

    const results = fuse.search(value);
    if (results.length > 0) {
      const bestMatch = results[0].item[suggestionKey];
      if (typeof bestMatch === 'string' && bestMatch.toLowerCase() !== value.toLowerCase()) {
        setSuggestion(bestMatch);
      } else {
        setSuggestion(null);
      }
    } else {
      setSuggestion(null);
    }
  }, [value, suggestionData, suggestionKey]);

  const handleSuggestionClick = () => {
    if (suggestion) {
      onChange(suggestion);
      if (onSuggestionClick) onSuggestionClick();
    }
  };
  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onClear) {
      onClear();
    } else {
      onChange('');
    }
  };

  return (
    <div className={cn("relative w-full max-w-sm", wrapperClassName)}>
      <GoSearch className={cn("absolute left-3 top-1/2 -translate-y-1/2 text-primary w-4 h-4 pointer-events-none", searchIconClassName)} />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full pl-9 pr-10 py-2.5 text-sm rounded-lg border border-[var(--border-divider)] bg-[var(--fill-color)] text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600",
          className
        )}
        {...props}
      />
      {value && (
        <button
          onClick={handleClear}
          type="button"
          className={cn(
            "absolute right-3 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100 transition-opacity text-secondary cursor-pointer",
            clearButtonClassName
          )}
          aria-label="Clear search"
        >
          <CgClose className={cn("w-5 h-5", iconClassName)} />
        </button>
      )}
      <div className="absolute left-0 top-full pt-1 pl-3 w-full text-left z-10 pointer-events-none">
        <div className={`text-xs text-secondary transition-opacity duration-300 pointer-events-auto ${suggestion ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            Did you mean:{' '}
            <button 
                onClick={handleSuggestionClick} 
                type="button"
                className="font-semibold text-blue-500 hover:underline cursor-pointer"
            >
                {suggestion}
            </button>
            ?
        </div>
      </div>
    </div>
  );
}