import React from 'react'
import Head from 'next/head';

export default function Meta() {
    return (
        <Head>
           /* Primary Meta Tags */
            <title>Boris Jobs Portfolio - Future AI Engineer</title>
            <meta charSet="utf-8" />
            <meta name="title" content="boris jobs Portfolio - Computer Engineering Student" />
            <meta name="description"
                content="Boris Jobs's Personal Portfolio Website. Made with Ubuntu 20.4 (Linux) theme by Next.js and Tailwind CSS." />
            <meta name="author" content="Boris Jobs" />
            <meta name="keywords"
                content="boris jobs, borisjobs's portfolio, borisjobs linux, ubuntu portfolio, boris jobs protfolio,boris jobs computer, boris jobs, boris ubuntu, boris jobs ubuntu portfolio" />
            <meta name="robots" content="index, follow" />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="language" content="English" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#E95420" />

            /* Search Engine */
            <meta name="image" content="images/logos/alexander-modified.png" /> 
            {/* fevicon.png */}
            /* Schema.org for Google */
            <meta itemProp="name" content="boris jobs Portfolio - Computer Engineering Student" />
            <meta itemProp="description"
                content="boris jobs's (borisjobs) Personal Portfolio Website. Made with Ubuntu 20.4 (Linux) theme by Next.js and Tailwind CSS." />
            <meta itemProp="image" content="images/logos/alexander-modified.png" />
            {/* fevicon.png */}
            /* Twitter */
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content="boris jobs Portfolio - Computer Engineering Student" />
            <meta name="twitter:description"
                content="boris jobs's (borisjobs) Personal Portfolio Website. Made with Ubuntu 20.4 (Linux) theme by Next.js and Tailwind CSS." />
            <meta name="twitter:site" content="borisjobs" />
            <meta name="twitter:creator" content="borisjobs" />
            <meta name="twitter:image:src" content="images/logos/alexander-modified.png" />
            {/* logo_1024.png */}
            /* Open Graph general (Facebook, Pinterest & Google+) */
            <meta name="og:title" content="boris jobs Portfolio - Computer Engineering Student" />
            <meta name="og:description"
                content="boris jobs's (borisjobs) Personal Portfolio Website. Made with Ubuntu 20.4 (Linux) theme by Next.js and Tailwind CSS." />
            <meta name="og:image" content="images/logos/alexander-modified.png" />
            {/* logo_1200.png */}
            <meta name="og:url" content="http://borisjobs.github.io/" />
            <meta name="og:site_name" content="boris jobs Personal Portfolio" />
            <meta name="og:locale" content="en_IN" />
            <meta name="og:type" content="website" />

            <link rel="icon" href="images/logos/alexander-modified.png" />
            {/* fevicon.svg */}
            <link rel="apple-touch-icon" href="images/logos/alexander-modified.png" />
            {/* logo.png */}
            <link rel="preload" href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap" as="style" />
            <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap" rel="stylesheet"></link>
        </Head>
    )
}
