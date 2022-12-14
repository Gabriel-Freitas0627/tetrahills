import { memo } from 'react'
import { Swatch } from '@components/product'
import type { ProductOption } from '@commerce/types/product'
import { SelectedOptions } from '../helpers'
import { useTranslations } from 'next-intl'

interface ProductOptionsProps {
  options: ProductOption[]
  selectedOptions: SelectedOptions
  setSelectedOptions: React.Dispatch<React.SetStateAction<SelectedOptions>>
}

const ProductOptions: React.FC<ProductOptionsProps> = ({
  options,
  selectedOptions,
  setSelectedOptions,
}) => {
  const t = useTranslations('productoptions')

  return (
    <div>
      {options.map((opt) => (
        <div
          className="pb-4 border-b last:border-b-0 mb-6 last:mb-0"
          key={opt.displayName}
        >
          {/* <h2 className="pt-3 uppercase font-medium text-sm tracking-wide">
            {t(opt.displayName.toLowerCase()).length == ''
              ? opt.displayName
              : t(opt.displayName.toLowerCase())}
          </h2> */}
          <div role="listbox" className="flex flex-row py-4">
            {opt.values.map((v, i: number) => {
              const active = selectedOptions[opt.displayName.toLowerCase()]
              return (
                <Swatch
                  key={`${opt.id}-${i}`}
                  active={v.label.toLowerCase() === active}
                  variant={opt.displayName}
                  color={v.hexColors ? v.hexColors[0] : ''}
                  label={v.label}
                  onClick={() => {
                    setSelectedOptions((selectedOptions) => {
                      return {
                        ...selectedOptions,
                        [opt.displayName.toLowerCase()]: v.label.toLowerCase(),
                      }
                    })
                  }}
                />
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

export default memo(ProductOptions)
