import {Link} from 'react-router';
import {Image, Money, Pagination} from '@shopify/hydrogen';
import {urlWithTrackingParams} from '~/lib/search';

/**
 * @param {Omit<SearchResultsProps, 'error' | 'type'>}
 */
export function SearchResults({term, result, children}) {
  if (!result?.total) {
    return null;
  }

  return children({...result.items, term});
}

SearchResults.Articles = SearchResultsArticles;
SearchResults.Pages = SearchResultsPages;
SearchResults.Products = SearchResultsProducts;
SearchResults.Empty = SearchResultsEmpty;

/**
 * @param {PartialSearchResult<'articles'>}
 */
function SearchResultsArticles({term, articles}) {
  if (!articles?.nodes.length) {
    return null;
  }

  return (
    <section className="space-y-4 border-b border-border pb-8">
      <h2 className="text-lg font-semibold uppercase tracking-wide">Articles</h2>
      <div className="space-y-2">
        {articles?.nodes?.map((article) => {
          const articleUrl = urlWithTrackingParams({
            baseUrl: `/blogs/${article.handle}`,
            trackingParams: article.trackingParameters,
            term,
          });

          return (
            <div key={article.id}>
              <Link prefetch="intent" to={articleUrl} className="text-foreground hover:text-secondary transition-colors">
                {article.title}
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/**
 * @param {PartialSearchResult<'pages'>}
 */
function SearchResultsPages({term, pages}) {
  if (!pages?.nodes.length) {
    return null;
  }

  return (
    <section className="space-y-4 border-b border-border pb-8">
      <h2 className="text-lg font-semibold uppercase tracking-wide">Pages</h2>
      <div className="space-y-2">
        {pages?.nodes?.map((page) => {
          const pageUrl = urlWithTrackingParams({
            baseUrl: `/pages/${page.handle}`,
            trackingParams: page.trackingParameters,
            term,
          });

          return (
            <div key={page.id}>
              <Link prefetch="intent" to={pageUrl} className="text-foreground hover:text-secondary transition-colors">
                {page.title}
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/**
 * @param {PartialSearchResult<'products'>}
 */
function SearchResultsProducts({term, products}) {
  if (!products?.nodes.length) {
    return null;
  }

  return (
    <section className="space-y-4 border-b border-border pb-8">
      <h2 className="text-lg font-semibold uppercase tracking-wide">Products</h2>
      <Pagination connection={products}>
        {({nodes, isLoading, NextLink, PreviousLink}) => {
          const ItemsMarkup = nodes.map((product) => {
            const productUrl = urlWithTrackingParams({
              baseUrl: `/products/${product.handle}`,
              trackingParams: product.trackingParameters,
              term,
            });

            const price = product?.selectedOrFirstAvailableVariant?.price;
            const image = product?.selectedOrFirstAvailableVariant?.image;

            return (
              <div key={product.id} className="py-3">
                <Link prefetch="intent" to={productUrl} className="flex items-center gap-4 group">
                  {image && (
                    <Image data={image} alt={product.title} width={50} className="rounded" />
                  )}
                  <div>
                    <p className="font-medium group-hover:text-secondary transition-colors">{product.title}</p>
                    <small className="text-muted-foreground">{price && <Money data={price} />}</small>
                  </div>
                </Link>
              </div>
            );
          });

          return (
            <div>
              <div>
                <PreviousLink>
                  {isLoading ? 'Loading...' : <span className="text-sm text-secondary hover:underline">↑ Load previous</span>}
                </PreviousLink>
              </div>
              <div className="divide-y divide-border">
                {ItemsMarkup}
              </div>
              <div className="mt-4">
                <NextLink>
                  {isLoading ? 'Loading...' : <span className="text-sm text-secondary hover:underline">Load more ↓</span>}
                </NextLink>
              </div>
            </div>
          );
        }}
      </Pagination>
    </section>
  );
}

function SearchResultsEmpty() {
  return <p className="mt-8 text-muted-foreground">No results, try a different search.</p>;
}

/** @typedef {RegularSearchReturn['result']['items']} SearchItems */
/**
 * @typedef {Pick<
 *   SearchItems,
 *   ItemType
 * > &
 *   Pick<RegularSearchReturn, 'term'>} PartialSearchResult
 * @template {keyof SearchItems} ItemType
 */
/**
 * @typedef {RegularSearchReturn & {
 *   children: (args: SearchItems & {term: string}) => React.ReactNode;
 * }} SearchResultsProps
 */

/** @typedef {import('~/lib/search').RegularSearchReturn} RegularSearchReturn */
