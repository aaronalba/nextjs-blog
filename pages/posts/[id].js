import Head from 'next/head'
import Date from '../../components/date'
import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'

export default function Post({ postData }) {
    return (
        <Layout>
            {/* Add the Head tag */}
            <Head>
                <title>{postData.title}</title>
            </Head>

            {/* Main Content */}
            <h1 className={utilStyles.headingX1}>{postData.title}</h1>
            <div className={utilStyles.lightText}>
                <Date dateString={postData.date} />
            </div>            
            <div dangerouslySetInnerHTML={{
                __html: postData.contentHtml
            }} />
        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}