import {
  ComponentProps,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import Alert from '@shared/Alert'
import { createPortal } from 'react-dom'

type AlertProps = ComponentProps<typeof Alert>
type AlertOptions = Omit<AlertProps, 'open'>

interface AlertContextValue {
  open: (options: AlertOptions) => void
}

const Context = createContext<AlertContextValue | undefined>(undefined)

const defaultValues: AlertProps = {
  open: false,
  title: null,
  description: null,
  onBtnClick: () => {},
}

export function AlertContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [alertState, setAlertState] = useState(defaultValues)

  const $portal_root = document.getElementById('root-portal')

  const close = useCallback(() => {
    setAlertState(defaultValues)
  }, [])

  const open = useCallback(
    ({ onBtnClick, ...options }: AlertOptions) => {
      setAlertState({
        ...options,
        onBtnClick: () => {
          close()
          onBtnClick()
        },
        open: true,
      })
    },
    [close],
  )

  const values = useMemo(() => ({ open }), [open])

  return (
    <Context.Provider value={values}>
      {children}
      {$portal_root != null
        ? createPortal(<Alert {...alertState} />, $portal_root)
        : null}
    </Context.Provider>
  )
}

export function useAlertContext() {
  const values = useContext(Context)

  if (values == null) {
    throw new Error('AlertContext 내부에서 사용해주세요.')
  }

  return values
}
