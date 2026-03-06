import * as React from 'react';
import {Pagination} from '@shopify/hydrogen';

/**
 * <PaginatedResourceSection > is a component that encapsulate how the previous and next behaviors throughout your application.
 * @param {Class<Pagination<NodesType>>['connection']>}
 */
export function PaginatedResourceSection({
  connection,
  children,
  resourcesClassName,
}) {
  return (
    <Pagination connection={connection}>
      {({nodes, isLoading, PreviousLink, NextLink}) => {
        const resourcesMarkup = nodes.map((node, index) =>
          children({node, index}),
        );

        return (
          <div>
            <PreviousLink>
              {isLoading ? (
                <span className="text-muted-foreground">Loading...</span>
              ) : (
                <span className="inline-block mb-6 px-6 py-2.5 rounded-md border border-border text-sm font-medium hover:bg-muted transition-colors">
                  Load previous
                </span>
              )}
            </PreviousLink>
            {resourcesClassName ? (
              <div className={resourcesClassName}>{resourcesMarkup}</div>
            ) : (
              resourcesMarkup
            )}
            <NextLink>
              {isLoading ? (
                <span className="text-muted-foreground">Loading...</span>
              ) : (
                <span className="inline-block mt-6 px-6 py-2.5 rounded-md border border-border text-sm font-medium hover:bg-muted transition-colors">
                  Load more
                </span>
              )}
            </NextLink>
          </div>
        );
      }}
    </Pagination>
  );
}
