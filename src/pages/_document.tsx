import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext
} from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta property="twitter:card" content="summary_large_image" />
          <meta
            property="twitter:url"
            content="https://pomo-do-more.vercel.app/"
          />
          <meta property="twitter:title" content="&#127813; Pomo Do More" />
          <meta
            property="twitter:description"
            content="A minimalist Pomodoro clock for do more."
          />
          <meta
            property="twitter:image:src"
            content="https://raw.githubusercontent.com/Alonso-Pablo/pomo-do-more/master/public/og.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
