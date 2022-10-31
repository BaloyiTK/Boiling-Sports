import { getPosts, getPostDetails } from "../../services";
import { useRouter } from "next/router";
import {
  PostDetail,
  Author,
  Comments,
  CommentsForm,
  PostWidget,
  Categories,
  Loader,
} from "../../components";
import React from "react";
import Head from "next/head";
import Script from "next/script";
import { serialize } from "next-mdx-remote/serialize";

const PostDetails = ({ post }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <Loader />;
  }
  return (
    
    <div className="container mx-auto px-10 mb-8 bg:white">
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
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7847426332221494"
        crossorigin="anonymous"
      />
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} key="desc" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:site"
          content="@https://twitter.com/BoilingSports"
        />
        <meta
          name="twitter:title"
          content="Boiling Sports | Football, Rugby, Tennis and Golf news"
        />
        <meta
          name="twitter:description"
          content="Boiling Sports | The international Sports News | Blog

          The official twitter account."
        />
        <meta
          name="twitter:image"
          content="https://www.boilingsports.co.za/_next/image?url=%2FLOGO.png&w=128&q=75"
        />
      </Head>

      <div className="grid grid-col-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post} />
          <script src="https://adstrack2.com/ppc/2425" async></script>
          <div id="acm-display-2425"></div>
          {/* <Comments slug={post.slug} /> */}
          {/* <CommentsForm slug={post.slug} /> */}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            {
              <PostWidget
                slug={post.slug}
                categories={post.categories.map((category) => category.slug)}
              />
            }
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;

export async function getStaticProps({ params }) {
  const data = await getPostDetails(params.slug);
  const html = await serialize(data.content);
  return {
    props: { post: data ,content:html},

    revalidate: 10,
  };
}
export async function getStaticPaths() {
  const posts = await getPosts();

  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  };
}
