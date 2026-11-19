import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { Icon } from '../Icon/Icon'
import { IconButton } from '../IconButton/IconButton'

export interface AttachmentProps {
  fileName: ReactNode
  /** Type and size, e.g. "PDF · 2.4 MB". */
  meta?: ReactNode
  /** Figma State: default (and Hover on pointer), uploading or error. */
  status?: 'default' | 'uploading' | 'error'
  /** Upload progress 0 to 100. */
  progress?: number
  errorText?: ReactNode
  onDownload?: () => void
  onCancel?: () => void
  onRetry?: () => void
  className?: string
}

/** A file row: icon, name, details and one action (download, cancel or retry). */
export function Attachment({
  fileName,
  meta,
  status = 'default',
  progress = 0,
  errorText = 'Upload failed. Try again.',
  onDownload,
  onCancel,
  onRetry,
  className,
}: AttachmentProps) {
  const isError = status === 'error'
  const percent = Math.min(100, Math.max(0, Math.round(progress)))
  return (
    <div
      className={cn(
        'flex w-full items-center gap-3 rounded-lg border bg-surface-base p-3 transition-colors',
        isError ? 'border-error-border' : 'border-border-default hover:bg-interaction-hover',
        className,
      )}
    >
      <span
        className={cn(
          'flex size-10 shrink-0 items-center justify-center rounded-md',
          isError ? 'bg-error-container text-error-on-container' : 'bg-surface-muted text-text-secondary',
        )}
      >
        <Icon name={isError ? 'error' : 'description'} size={20} />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="truncate text-label-base text-text-primary">{fileName}</p>
        {status === 'default' && meta && <p className="truncate text-body-xsmall text-text-secondary">{meta}</p>}
        {status === 'uploading' && (
          <>
            <p className="text-body-xsmall text-text-secondary tabular-nums">Uploading… {percent}%</p>
            <div role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} className="h-1 w-full overflow-hidden rounded-full bg-secondary-pressed">
              <div className="h-full bg-primary-default transition-[width]" style={{ width: `${percent}%` }} />
            </div>
          </>
        )}
        {isError && <p className="text-body-xsmall text-error-default">{errorText}</p>}
      </div>
      {status === 'default' && <IconButton icon="download" label="Download" size={32} iconSize={20} onClick={onDownload} />}
      {status === 'uploading' && <IconButton icon="close" label="Cancel upload" size={32} iconSize={20} onClick={onCancel} />}
      {isError && <IconButton icon="refresh" label="Retry upload" size={32} iconSize={20} onClick={onRetry} />}
    </div>
  )
}
