import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Tailwind Merge
 */
function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}

export { cn };
