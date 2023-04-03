import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import { Exact } from './types';

const defaultOptions = {} as const;

export type RelationsQueryVariables = Exact<{ [key: string]: never }>;

export type RelationsQuery = {
    __typename?: 'Query';
    applicantIndividualCompanyRelations?: {
        __typename?: 'ApplicantIndividualCompanyRelationPaginator';
        data: Array<{
            __typename?: 'ApplicantIndividualCompanyRelation';
            id: string;
            name: string;
        }>;
    } | null;
};

export type PositionsQueryVariables = Exact<{ [key: string]: never }>;

export type PositionsQuery = {
    __typename?: 'Query';
    applicantIndividualCompanyPositions?: {
        __typename?: 'ApplicantIndividualCompanyPositionPaginator';
        data: Array<{
            __typename?: 'ApplicantIndividualCompanyPosition';
            id: string;
            name: string;
        }>;
    } | null;
};

export const RelationsDocument = gql`
    query Relations {
        applicantIndividualCompanyRelations {
            data {
                id
                name
            }
        }
    }
`;

/**
 * __useRelationsQuery__
 *
 * To run a query within a React component, call `useRelationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRelationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRelationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useRelationsQuery(
    baseOptions?: Apollo.QueryHookOptions<RelationsQuery, RelationsQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<RelationsQuery, RelationsQueryVariables>(
        RelationsDocument,
        options
    );
}
export function useRelationsLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<RelationsQuery, RelationsQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<RelationsQuery, RelationsQueryVariables>(
        RelationsDocument,
        options
    );
}
export type RelationsQueryHookResult = ReturnType<typeof useRelationsQuery>;
export type RelationsLazyQueryHookResult = ReturnType<typeof useRelationsLazyQuery>;
export type RelationsQueryResult = Apollo.QueryResult<
    RelationsQuery,
    RelationsQueryVariables
>;
export const PositionsDocument = gql`
    query Positions {
        applicantIndividualCompanyPositions {
            data {
                id
                name
            }
        }
    }
`;

/**
 * __usePositionsQuery__
 *
 * To run a query within a React component, call `usePositionsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePositionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePositionsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePositionsQuery(
    baseOptions?: Apollo.QueryHookOptions<PositionsQuery, PositionsQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<PositionsQuery, PositionsQueryVariables>(
        PositionsDocument,
        options
    );
}
export function usePositionsLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<PositionsQuery, PositionsQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<PositionsQuery, PositionsQueryVariables>(
        PositionsDocument,
        options
    );
}
export type PositionsQueryHookResult = ReturnType<typeof usePositionsQuery>;
export type PositionsLazyQueryHookResult = ReturnType<typeof usePositionsLazyQuery>;
export type PositionsQueryResult = Apollo.QueryResult<
    PositionsQuery,
    PositionsQueryVariables
>;
