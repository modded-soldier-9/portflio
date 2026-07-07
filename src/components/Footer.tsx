import { siteConfig } from '@/config/site';

const Footer = () => {
  return (
    <footer className="border-t border-border py-8">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-fg-faint">
        <p>&copy; {new Date().getFullYear()} {siteConfig.name}</p>
        <div className="flex items-center gap-4">
          <a href={siteConfig.github.url} target="_blank" rel="noopener noreferrer" className="hover:text-fg transition-colors">GitHub</a>
          <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-fg transition-colors">LinkedIn</a>
          <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-fg transition-colors">Email</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
