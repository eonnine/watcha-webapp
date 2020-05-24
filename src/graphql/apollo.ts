import { ApolloClient } from 'apollo-client'
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
import { createHttpLink,  } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import { RetryLink } from "apollo-link-retry"
import { WebSocketLink } from "apollo-link-ws"
import { getMainDefinition } from 'apollo-utilities'
import { split , from } from 'apollo-link'

import introspectionQueryResultData from './fragmentTypes'

const GRAPHQL_ENDPOINT = "api.graph.cool/simple/v1/swapi"

/**
 * @ref
 *  apollo-link-http: https://www.apollographql.com/docs/link/links/http/
 */
const httpLink = createHttpLink({
  uri: `https://${GRAPHQL_ENDPOINT}`,
  credentials: 'omit',
})

/**
 * @ref
 *  apollo-link-ws: https://www.apollographql.com/docs/link/links/ws/
 *  Subscriptions: https://www.apollographql.com/docs/react/data/subscriptions/
 */
// const wsLink = new WebSocketLink({
//   //uri: `ws://${GRAPHQL_ENDPOINT}`,
//   options: {
//     reconnect: true,
//     connectionParams: {
//       authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '',
//     },
//   }
// })

/**
 * @ref
 *  Composing Links: https://www.apollographql.com/docs/link/composition/#directional-composition
 */
// const link = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query)
//     return (definition.kind === 'OperationDefinition' && definition.operation === 'subscription')
//   },
//   wsLink,
//   httpLink,
// )

/**
 * @ref
 *  Authentication: https://www.apollographql.com/docs/react/networking/authentication/
 */
const authLink = setContext((operation, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
})

/**
 * @ref
 *  apollo-link-retry: https://www.apollographql.com/docs/link/links/retry/
 */
const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: 1000,
    jitter: true
  },
  attempts: {
    max: 5,
    retryIf: (error, _operation) => !!error
  }
})

/**
 * @ref
 *  apollo-link-error: https://www.apollographql.com/docs/link/links/error/
 */
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      switch ((err.extensions || {}).code) {
        case 'UNAUTHENTICATED':
          // error code is set to UNAUTHENTICATED
          // when AuthenticationError thrown in resolver

          // modify the operation context with a new token
          const oldHeaders = operation.getContext().headers
          operation.setContext({
            headers: {
              ...oldHeaders,
              authorization: `new Token`,
            },
          })
          // retry the request, returning the new observable
          return forward(operation)
      }
    }
  }
  if (networkError) {
    console.dir('Network Error', networkError)
  }
})

/**
 * @ref
 *  caching: https://www.apollographql.com/docs/react/caching/cache-configuration/
 */
const cache = new InMemoryCache({
  addTypename: true,
  dataIdFromObject: (obj: any) => obj.key || null,
  /**
   * @ref
   *  Graphql Code Generator: https://graphql-code-generator.com/
   *  Using fragments: https://www.apollographql.com/docs/react/data/fragments/#fragments-on-unions-and-interfaces
   *  fragment-matcher: https://graphql-code-generator.com/docs/plugins/fragment-matcher/
   */
  fragmentMatcher: new IntrospectionFragmentMatcher({
    introspectionQueryResultData
  }),
  cacheRedirects: {},
})

/**
 * @ref
 *  ApolloClient: https://www.apollographql.com/docs/react/api/apollo-client/
 */
export const apolloClient = new ApolloClient({
  ssrMode: false,
  /**
   * 에러 링크는 http 혹은 
   */
  link: from([errorLink, retryLink, authLink, httpLink]),
  cache,
  // 개발일때만 true
  connectToDevTools: true,
  queryDeduplication: true,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  }
})