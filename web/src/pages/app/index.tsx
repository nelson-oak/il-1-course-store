/* eslint-disable @next/next/no-html-link-for-pages */
import { getAccessToken, useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useGetProductsQuery, useMeQuery } from '../../graphql/generated/graphql';
import { getServerPageGetProducts, ssrGetProducts } from "../../graphql/generated/page";
import { withApollo } from '../../lib/withApollo';

export function Home({ data}) {
  const { user } = useUser()
  const { data: me } = useMeQuery()

  return (
    <div className="text-violet-500">
      <h1>Hello Next.js</h1>

      <pre>
        Me:
        {JSON.stringify(me, null, 2)}
      </pre>

      {/* <pre>
        Data:
        {JSON.stringify(data.products, null, 2)}
      </pre> */}

      <pre>
        User:
        {JSON.stringify(user, null, 2)}
      </pre>
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async(ctx) => {
    const { req, res } = ctx
    console.log(getAccessToken(req, res))

    // return getServerPageGetProducts(null, ctx)

    return {
      props: {}
    }
  }
})

export default withApollo(
  ssrGetProducts.withPage()(Home)
)