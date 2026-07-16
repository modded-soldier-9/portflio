import { siteConfig } from '@/config/site';

const Footer = () => {
  return (
    <footer className="container py-8 text-center">
      <hr className="divider" />
      <p className="text-xs text-ink-faint mt-6">
        &copy; {new Date().getFullYear()} {siteConfig.name} &middot; {siteConfig.location}
      </p>
    </footer>
  );
};

export default Footer;
