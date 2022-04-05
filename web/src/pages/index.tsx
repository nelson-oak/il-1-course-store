/* eslint-disable @next/next/no-html-link-for-pages */
import { getSession } from "@auth0/nextjs-auth0"
import { GetServerSideProps } from "next"

export default function Home() {
  return null
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = getSession(req, res)
  const token = session.accessToken

  console.log(token)

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/login',
        permanent: false
      }
    }
  } else {
    return {
      redirect: {
        destination: '/app',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}
