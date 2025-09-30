'use client';

const StructuredData = () => {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mohamed Elsheikh",
    "jobTitle": "Head of Cyber Security",
    "description": "Head of Cyber Security at Quota Libex | AWS Academy Graduate | Cybersecurity Expert | Web Developer | IT Management Leader",
    "url": "https://mohamedelsheikh.dev",
    "image": "https://mohamedelsheikh.dev/personal.jpg",
    "sameAs": [
      "https://github.com/modded-soldier-9",
      "https://linkedin.com/in/mohamed-elsheikh",
      "https://twitter.com/mohamedelsheikh"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "South Africa",
      "addressRegion": "Johannesburg Metropolitan Area"
    },
    "worksFor": {
      "@type": "Organization",
      "name": "Quota Libex",
      "url": "https://quotalibex.com"
    },
    "alumniOf": [
      {
        "@type": "EducationalOrganization",
        "name": "AWS Academy"
      }
    ],
    "knowsAbout": [
      "Cybersecurity",
      "Cloud Computing",
      "Web Development",
      "IT Management",
      "Python",
      "JavaScript",
      "AWS",
      "Security Protocols",
      "API Development",
      "Network Security"
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "name": "AWS Academy Graduate - AWS Academy Cloud Architecting",
        "credentialCategory": "degree",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Amazon Web Services (AWS)"
        },
        "dateIssued": "2024-04-01"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "AWS Academy Graduate - AWS Academy Cloud Foundations",
        "credentialCategory": "degree",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Amazon Web Services (AWS)"
        },
        "dateIssued": "2024-03-01"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Microsoft Cybersecurity Analyst",
        "credentialCategory": "certification",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Microsoft"
        },
        "dateIssued": "2025-03-01"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Google Cybersecurity",
        "credentialCategory": "certification",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Google"
        },
        "dateIssued": "2025-03-01"
      }
    ],
    "hasOccupation": [
      {
        "@type": "Occupation",
        "name": "Head of Cyber Security",
        "occupationLocation": {
          "@type": "City",
          "name": "Johannesburg Metropolitan Area"
        },
        "datePosted": "2024-07-01",
        "hiringOrganization": {
          "@type": "Organization",
          "name": "Quota Libex"
        }
      },
      {
        "@type": "Occupation",
        "name": "Information Technology Manager",
        "occupationLocation": {
          "@type": "Country",
          "name": "South Africa"
        },
        "datePosted": "2016-11-01",
        "hiringOrganization": {
          "@type": "Organization",
          "name": "Midostransport"
        }
      }
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Mohamed Elsheikh Portfolio",
    "url": "https://mohamedelsheikh.dev",
    "description": "Professional portfolio showcasing cybersecurity expertise, cloud computing skills, and web development projects",
    "author": {
      "@type": "Person",
      "name": "Mohamed Elsheikh"
    },
    "inLanguage": "en-US",
    "copyrightYear": "2024",
    "genre": "Portfolio",
    "keywords": [
      "cybersecurity",
      "cloud computing",
      "web development",
      "AWS",
      "Python",
      "JavaScript",
      "IT management",
      "security protocols"
    ]
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Mohamed Elsheikh Professional Services",
    "url": "https://mohamedelsheikh.dev",
    "logo": "https://mohamedelsheikh.dev/logo.png",
    "description": "Professional cybersecurity and IT management services",
    "founder": {
      "@type": "Person",
      "name": "Mohamed Elsheikh"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "South Africa",
      "addressRegion": "Johannesburg Metropolitan Area"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Professional Services",
      "email": "contact@mohamedelsheikh.dev",
      "availableLanguage": "English"
    },
    "sameAs": [
      "https://github.com/modded-soldier-9",
      "https://linkedin.com/in/mohamed-elsheikh"
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://mohamedelsheikh.dev#home"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Experience",
        "item": "https://mohamedelsheikh.dev#experience"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Projects",
        "item": "https://mohamedelsheikh.dev#projects"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Skills",
        "item": "https://mohamedelsheikh.dev#skills"
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "Contact",
        "item": "https://mohamedelsheikh.dev#contact"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
    </>
  );
};

export default StructuredData;
