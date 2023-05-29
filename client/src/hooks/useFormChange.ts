import { ChangeEvent, useState } from 'react'
import type { FormElement } from '@nextui-org/react'

const useFormChange = <T extends (RegisterInfo | LoginInfo)>(info: T) => {
  const [formInfo, setFormInfo] = useState<T>(info)

  const handleFieldChange = (field: keyof T) =>
    (e: ChangeEvent<FormElement>) => {
      setFormInfo(prev => ({
        ...prev,
        [field]: e.target.value
      }))
    }

  return {
    formInfo,
    setFormInfo,
    handleFieldChange
  }
}

export default useFormChange
