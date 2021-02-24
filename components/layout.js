import * as React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { ChevronDownIcon } from '@/icons'
import { GraphCMSSVG } from '@/svgs'
import { locales } from 'graphcms.config'
import { useCurrencyContext } from '@/context/currency'

function Layout({ children, navigation }) {
  const { activeCurrency, switchCurrency } = useCurrencyContext()
  const router = useRouter()

  const activeLocale = locales.find((locale) => locale.value === router.locale)

  const updateLocale = (event) => {
    const path = ['/cart'].includes(router.asPath) ? router.asPath : '/'

    router.push(path, path, { locale: event.target.value })
  }

  const updateCurrency = (event) => {
    const currency = navigation.currencies.find(
      (currency) => currency.code === event.target.value
    )

    switchCurrency(currency)
  }

  return (
    <React.Fragment>
      <header className="max-w-7xl mx-auto bg-white flex-grow flex items-center justify-between px-4 sm:px-6">
        <div className="py-6 w-full">
          <nav className="flex items-center justify-between flex-wrap space-x-4">
            <Link href="/">
              <a>
                <GraphCMSSVG className="h-auto text-primary w-5" />
              </a>
            </Link>
            {navigation?.pages.length ? (
              <ul className="hidden md:mx-auto md:block md:flex-grow">
                {navigation?.pages.map((page) => (
                  <li
                    key={page.id}
                    className="block my-4 md:inline-block md:my-0"
                  >
                    <Link href={`/${page.type.toLowerCase()}/${page.slug}`}>
                      <a className="text-lightgray hover:text-slategray hover:bg-gainsboro rounded-full py-2 px-3 font-medium">
                        {page.name}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
            <div className="flex items-center">
              <form className="flex sm:max-w-xs">
                <fieldset className="w-full">
                  <label htmlFor="language" className="sr-only">
                    Language
                  </label>
                  <div className="relative">
                    <select
                      id="language"
                      name="language"
                      value={activeLocale.value}
                      className="block appearance-none bg-white border-none px-4 py-0 pr-8 focus:outline-none focus:bg-white text-lightgray focus:text-slategray rounded-lg"
                      onChange={updateLocale}
                    >
                      {locales.map((locale) => (
                        <option key={locale.value} value={locale.value}>
                          {locale.label}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center">
                      <ChevronDownIcon
                        className="h-4 w-4 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </fieldset>
                {activeCurrency && navigation?.currencies?.length ? (
                  <fieldset className="w-full">
                    <label htmlFor="language" className="sr-only">
                      Language
                    </label>
                    <div className="relative">
                      <select
                        id="language"
                        name="language"
                        value={activeCurrency.code}
                        className="block appearance-none bg-white border-none px-4 py-0 pr-8 focus:outline-none focus:bg-white text-lightgray focus:text-slategray rounded-lg"
                        onChange={updateCurrency}
                      >
                        {navigation.currencies.map((currency) => (
                          <option key={currency.id} value={currency.code}>
                            {currency.code}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center">
                        <ChevronDownIcon
                          className="h-4 w-4 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </fieldset>
                ) : null}
              </form>
              <Link href="/cart">
                <a>Cart</a>
              </Link>
            </div>
          </nav>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">{children}</div>
    </React.Fragment>
  )
}

export default Layout
