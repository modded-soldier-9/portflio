import { siteConfig } from '@/config/site';

const Footer = () => {
  return (
    <footer className="max-w-[820px] mx-auto px-5 py-8 text-center">
      <p className="text-xs text-ink-faint">
        &copy; {new Date().getFullYear()} {siteConfig.name} &middot; {siteConfig.location}
      </p>
    </footer>
  );
};

export default Footer;
