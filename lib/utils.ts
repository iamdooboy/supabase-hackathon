import { clsx, type ClassValue } from 'clsx'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { twMerge } from 'tailwind-merge'

TimeAgo.addDefaultLocale(en)

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createTimeAgo(date: Date) {
  const timeAgo = new TimeAgo('en-US')
  return timeAgo.format(date)
}
