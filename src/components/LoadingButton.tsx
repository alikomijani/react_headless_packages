import React, { ElementType, useCallback, useState } from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<any>
  ProgressComponent?: ElementType
  Component?: ElementType
  progressProps?: object
  loadingText: string
}

const LoadingButton: React.FC<Props> = ({
  onClick,
  ProgressComponent = 'progress',
  Component = 'button',
  children,
  progressProps,
  loadingText = 'loading...',
  ...props
}) => {
  const [loading, setLoading] = useState(false)
  const _onClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setLoading(true)
      onClick(e).finally(() => {
        setLoading(false)
      })
    },
    [onClick],
  )
  if (ProgressComponent) {
    return (
      <Component {...props} role={'button'} disabled={loading || props.disabled} onClick={_onClick}>
        {loading ? <ProgressComponent {...progressProps}>{loadingText}</ProgressComponent> : children}
      </Component>
    )
  } else {
    return (
      <Component {...props} role={'button'} disabled={loading || props.disabled} onClick={_onClick}>
        {loading ? loadingText : children}
      </Component>
    )
  }
}

export default LoadingButton
