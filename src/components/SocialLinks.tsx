import { socialLinks } from '@/config/social';

const SocialLinks = () => {
  return (
    <div className="flex items-center gap-2">
      {socialLinks.map(({ name, url, icon: Icon }) => (
        <a
          key={name}
          href={url}
          aria-label={name}
          target={url.startsWith('http') ? '_blank' : undefined}
          rel={url.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="p-1.5 text-ink-faint hover:text-accent transition-colors"
        >
          <Icon className="w-4 h-4" aria-hidden="true" />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
