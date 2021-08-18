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
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#D35A44" />
          <link rel="apple-touch-icon" href="/icon-76x76.png" />

          <meta property="twitter:card" content="summary_large_image" />
          <meta
            property="twitter:url"
            content="https://pomo-do-more.vercel.app/"
          />
          <meta property="og:site_name" content="Pomo Do More"></meta>
          <meta property="twitter:title" content="&#127813; Pomo Do More" />
          <meta property="og:title" content="&#127813; Pomo Do More" />
          <meta
            property="twitter:description"
            content="A minimalist Pomodoro clock for do more."
          />
          <meta
            property="og:description"
            content="A minimalist Pomodoro clock for do more."
          ></meta>
          <meta
            property="twitter:image:src"
            content="https://raw.githubusercontent.com/Alonso-Pablo/pomo-do-more/master/public/og.png"
          />
          <meta
            property="og:image"
            content="https://raw.githubusercontent.com/Alonso-Pablo/pomo-do-more/master/public/og.png"
          />
          <meta property="og:url" content="https://pomo-do-more.vercel.app" />
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
