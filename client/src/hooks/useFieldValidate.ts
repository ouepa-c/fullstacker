import { useState } from 'react'
import { FieldTypes, validator } from '@/utils/form-validate'

const useFieldValidate = (forminfo: LoginInfo | RegisterInfo) => {
  const [helpText, setHelpText] = useState<Record<string, string | boolean> & {
    [index: string]: any
  }>({
    [FieldTypes.nickname]: '',
    [FieldTypes.password]: '',
    [FieldTypes.username]: '',
    [FieldTypes.email]: true,
    [FieldTypes.github]: true,
    [FieldTypes.phone]: true
  })

  const handleFieldValidate = (field: FieldTypes) =>
    () => {
      const value = validator[field](forminfo[field])
      setHelpText(prev => ({
        ...prev,
        [field]: value
      }))
    }

  const reset = () => {
    setHelpText({
      [FieldTypes.nickname]: '',
      [FieldTypes.password]: '',
      [FieldTypes.username]: '',
      [FieldTypes.email]: true,
      [FieldTypes.github]: true,
      [FieldTypes.phone]: true
    })
  }

  const validate = () => {
    const validation: (string | boolean)[] = []
    for (const el in helpText) {
      if (el in forminfo) {
        validation.push(helpText[el])
      }
    }
    return validation.every(t => typeof t === 'boolean')
  }

  return {
    helpText,
    handleFieldValidate,
    reset,
    validate
  }
}

export default useFieldValidate
