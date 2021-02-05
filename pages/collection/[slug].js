import getAllCollections from '@/lib/get-all-collections'
import getCollectionBySlug from '@/lib/get-collection-slug'
import getNavigation from '@/lib/get-navigation'
import ProductGrid from '@/components/product-grid'

function CollectionPage({ collection }) {
  return <ProductGrid products={collection.products} />
}

export async function getStaticPaths({ locales }) {
  let paths = []

  for (const locale of locales) {
    const { collections } = await getAllCollections({ locale })

    paths = [
      ...paths,
      ...collections.map((collection) => ({
        params: { slug: collection.slug },
        locale
      }))
    ]
  }

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ locale, params }) {
  const { navigation } = await getNavigation({ locale })
  const { collection } = await getCollectionBySlug({
    locale,
    slug: params.slug
  })

  return {
    props: {
      collection,
      navigation
    }
  }
}

export default CollectionPage