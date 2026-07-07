import { socialLinks } from '@/config/social';

const SocialLinks = () => {
  return (
    <div className="flex items-center gap-3 pt-2">
      {socialLinks.map(({ name, url, icon: Icon }) => (
        <a
          key={name}
          href={url}
          aria-label={name}
          target={url.startsWith('http') ? '_blank' : undefined}
          rel={url.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="p-2 rounded-lg text-fg-muted hover:text-accent transition-colors"
        >
          <Icon className="w-5 h-5" aria-hidden="true" />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
