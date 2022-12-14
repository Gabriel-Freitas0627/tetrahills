import { SWRHook } from '@vercel/commerce/utils/types'
import useSearch, { UseSearch } from '@vercel/commerce/product/use-search'
import type { SearchProductsHook } from '../types/product'

export default useSearch as UseSearch<typeof handler>

export type SearchProductsInput = {
  search?: string
  categoryId?: number | string
  brandId?: number
  sort?: string
  locale?: string
  priceMin?: number | string
  priceMax?: number | string
  sizeFilter?: string
}

export const handler: SWRHook<SearchProductsHook> = {
  fetchOptions: {
    url: '/api/catalog/products',
    method: 'GET',
  },
  fetcher({
    input: {
      search,
      categoryId,
      categoryIds,
      brandId,
      sort,
      priceMin,
      priceMax,
      sizeFilter
    },
    options,
    fetch,
  }) {
    // Use a dummy base as we only care about the relative path
    const url = new URL(options.url!, 'http://a')

    if (search) url.searchParams.set('search', search)
    if (Number.isInteger(Number(categoryId)))
      url.searchParams.set('categoryId', String(categoryId))
    if (categoryIds) url.searchParams.set('categoryIds', String(categoryIds))
    if (Number.isInteger(brandId))
      url.searchParams.set('brandId', String(brandId))
    if (sort) url.searchParams.set('sort', sort)
    if (Number.isInteger(Number(priceMin)))
      url.searchParams.set('priceMin', String(priceMin))
    if (Number.isInteger(Number(priceMax)))
      url.searchParams.set('priceMax', String(priceMax))
    if (sizeFilter) url.searchParams.set('sizeFilter', sizeFilter)

    return fetch({
      url: url.pathname + url.search,
      method: options.method,
    })
  },
  useHook:
    ({ useData }) =>
    (input = {}) => {
      return useData({
        input: [
          ['search', input.search],
          ['categoryId', input.categoryId],
          ['categoryIds', input.categoryIds],
          ['brandId', input.brandId],
          ['sort', input.sort],
          ['priceMin', input.priceMin],
          ['priceMax', input.priceMax],
          ['sizeFilter', input.sizeFilter]
        ],
        swrOptions: {
          revalidateOnFocus: false,
          ...input.swrOptions,
        },
      })
    },
}
