import Head from "next/head";
import Image from "next/image";
import { PostCard, Categories, PostWidget, FeaturedPost } from "../components";
import { getPosts } from "../services";
import Script from "next/script";

export default function Home({ posts }) {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-Q2LN0BXS84"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-Q2LN0BXS84');
        `}
      </Script>

      <Head>
        <title>Boiling Sports | Football, Rugby, Tennis and Golf news</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charset="UTF-8" />
        <meta
          name="ahrefs-site-verification"
          content="2113cb2a51ab7d923f3325dbaf0a488c2d927d5f401ab56ea6e050fc9cfbf47c"
        ></meta>
        <meta
          name="description"
          content="Get the latest international sports news, results and updates from around the globe."
          key="desc"
        />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preload" href="globals.scss" as="style"></link>
      </Head>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7847426332221494"
        crossorigin="anonymous"
      />
      <FeaturedPost />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post) => (
            <PostCard post={post.node} key={post.title} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}
export async function getStaticProps() {
  const posts = (await getPosts()) || [];

  return {
    props: { posts },

    revalidate: 10,
  };
}
