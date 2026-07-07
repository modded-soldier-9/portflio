import { siteConfig } from '@/config/site';

/**
 * JSON-LD structured data for SEO.
 * Server component — no 'use client' needed since it only emits static script tags.
 */
const StructuredData = () => {
  const { url } = siteConfig;

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    description: `${siteConfig.role} at ${siteConfig.company} | AWS Academy Graduate | Cybersecurity Expert | IT Management Leader`,
    url,
    image: `${url}/personal.jpg`,
    sameAs: [siteConfig.github.url, siteConfig.linkedin],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'South Africa',
      addressRegion: 'Johannesburg Metropolitan Area',
    },
    worksFor: {
      '@type': 'Organization',
      name: siteConfig.company,
    },
    alumniOf: [{ '@type': 'EducationalOrganization', name: 'AWS Academy' }],
    knowsAbout: [
      'Cybersecurity',
      'Cloud Computing',
      'Web Development',
      'IT Management',
      'Python',
      'JavaScript',
      'AWS',
      'Security Protocols',
      'API Development',
      'Network Security',
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'AWS Academy Graduate - Cloud Architecting',
        credentialCategory: 'certification',
        recognizedBy: { '@type': 'Organization', name: 'Amazon Web Services (AWS)' },
        dateIssued: '2024-04-01',
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'AWS Academy Graduate - Cloud Foundations',
        credentialCategory: 'certification',
        recognizedBy: { '@type': 'Organization', name: 'Amazon Web Services (AWS)' },
        dateIssued: '2024-03-01',
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Microsoft Cybersecurity Analyst',
        credentialCategory: 'certification',
        recognizedBy: { '@type': 'Organization', name: 'Microsoft' },
        dateIssued: '2025-03-01',
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Google Cybersecurity',
        credentialCategory: 'certification',
        recognizedBy: { '@type': 'Organization', name: 'Google' },
        dateIssued: '2025-03-01',
      },
    ],
    hasOccupation: [
      {
        '@type': 'Occupation',
        name: 'Head of Cyber Security',
        occupationLocation: { '@type': 'City', name: 'Johannesburg' },
        hiringOrganization: { '@type': 'Organization', name: 'Quota Libex' },
      },
      {
        '@type': 'Occupation',
        name: 'Information Technology Manager',
        occupationLocation: { '@type': 'Country', name: 'South Africa' },
        hiringOrganization: { '@type': 'Organization', name: 'Midostransport' },
      },
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${siteConfig.name} Portfolio`,
    url,
    description:
      'Professional portfolio showcasing cybersecurity expertise, cloud computing skills, and web development projects.',
    author: { '@type': 'Person', name: siteConfig.name },
    inLanguage: 'en-US',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: url },
      { '@type': 'ListItem', position: 2, name: 'Experience', item: `${url}#experience` },
      { '@type': 'ListItem', position: 3, name: 'Projects', item: `${url}#projects` },
      { '@type': 'ListItem', position: 4, name: 'Skills', item: `${url}#skills` },
      { '@type': 'ListItem', position: 5, name: 'Contact', item: `${url}#contact` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
};

export default StructuredData;
