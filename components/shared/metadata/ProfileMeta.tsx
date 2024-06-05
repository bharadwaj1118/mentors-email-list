import Head from "next/head";

type ProfileMetaProps = {
  title: string;
  description: string;
  image: string;
};

const ProfileMeta = ({ title, description, image }: ProfileMetaProps) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />

    {/* Open Graph tags for Facebook and LinkedIn */}
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:url" content={window.location.href} />

    {/* Twitter Cards */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />

    {/* Additional metadata for WhatsApp doesn't use specific meta tags, but the same og: tags */}
    {/* No specific meta tags for Email, but setting up data for potential use in mailto links */}
  </Head>
);

export default ProfileMeta;
