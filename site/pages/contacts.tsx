import { Container } from '@components/ui'
import { Layout } from '@components/common'
import React from 'react'
import { useTranslations } from 'next-intl'

export default function Contacts() {
  const t = useTranslations('contacts')
  return (
    <div className="mt-10">
      <Container>
        <div className="grid grid-cols-1 gap-x-5 mb-10">
          <div className="order-last flex flex-col self-center text-xl md:text-[20px]">
            <p className="text-center text-[30px] text-[#000000] leading-[40px] font-normal">
              {t('title')}
              <br />
              <br />
            </p>

            <p>Trans logistic servis s.r.o.</p>
            <p>
              Jenisejsk&aacute; 45A 040 12 Ko&scaron;ice - mestsk&aacute; časť
              Nad jazerom. Slovakia
            </p>
            <p>&nbsp;</p>
            <p>IČO: 53312163</p>
            <p>DIČ: 2121337845</p>
            <p>IBAN: SK63 0200 0000 0043884517153</p>
            <p>tel .: + 421919372404 / {t('worktime')}</p>
            <p>mail: tatrahills@gmail.сom</p>
            <p>{t('contact_person')}</p>
            <p>{t('info')}</p>
          </div>
        </div>
      </Container>
    </div>
  )
}
Contacts.Layout = Layout
