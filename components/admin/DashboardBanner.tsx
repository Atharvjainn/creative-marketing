import React from 'react';

export default function DashboardBanner() {
  const collectionLinks = [
    { label: 'Blogs & Articles', href: '/admin/collections/blogs', icon: '📰', desc: 'Create, edit & publish articles', badge: 'Active' },
    { label: 'Portfolio Projects', href: '/admin/collections/projects', icon: '🎨', desc: 'Case studies & client showcases', badge: 'Cases' },
    { label: 'Categories', href: '/admin/collections/categories', icon: '🏷️', desc: 'Blog & project taxonomy filters' },
    { label: 'Media Library', href: '/admin/collections/media', icon: '📁', desc: 'Images, thumbnails & assets' },
  ];

  const sectionLinks = [
    { label: 'Hero Section', href: '/admin/globals/hero', icon: '🚀', desc: 'Headline, 3D disc & badges' },
    { label: 'Solutions', href: '/admin/globals/solutions', icon: '💡', desc: 'Glassmorphism macOS mockup' },
    { label: 'Partners', href: '/admin/globals/partners', icon: '🤝', desc: '3-line heading & marquee logos' },
    { label: 'Features Grid', href: '/admin/globals/features', icon: '⚡', desc: 'Dynamic auto-adjusting grid' },
    { label: 'Key Features', href: '/admin/globals/key-features', icon: '🔑', desc: 'Alternating showcase blocks' },
    { label: 'Business Solutions', href: '/admin/globals/business-solutions', icon: '💼', desc: 'Sticky headers & card stack' },
    { label: 'Benefits & Stats', href: '/admin/globals/benefits', icon: '📈', desc: 'Live count-up metrics & ROI' },
    { label: 'Pricing Plans', href: '/admin/globals/pricing', icon: '💳', desc: 'Tiers & popular ribbons' },
    { label: 'Testimonials', href: '/admin/globals/testimonials', icon: '⭐', desc: '5-star reviews & client trust' },
    { label: 'CTA & Contact', href: '/admin/globals/cta', icon: '🎯', desc: 'Call to action banner' },
    { label: 'Footer Links', href: '/admin/globals/footer', icon: '🌐', desc: 'Copyright, brand & social links' },
    { label: 'Site Settings & SEO', href: '/admin/globals/site-settings', icon: '⚙️', desc: 'Meta tags, title & OG image' },
  ];

  return (
    <div style={{ marginBottom: '40px', marginTop: '16px' }}>
      {/* Welcome Banner */}
      <div
        style={{
          background: 'radial-gradient(ellipse at top left, rgba(234, 88, 12, 0.22) 0%, rgba(26, 9, 2, 0.95) 70%, #0c0401 100%)',
          border: '1px solid rgba(234, 88, 12, 0.35)',
          borderRadius: '20px',
          padding: '28px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span
              style={{
                width: '9px',
                height: '9px',
                borderRadius: '50%',
                background: '#10B981',
                boxShadow: '0 0 12px #10B981',
                display: 'inline-block',
              }}
            />
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#FF8A50', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              Creative Marketing Control Center • Payload CMS 3
            </span>
          </div>
          <h2 style={{ fontSize: '26px', fontWeight: 700, color: '#FFFFFF', margin: 0, letterSpacing: '-0.5px' }}>
            Content & Platform Dashboard
          </h2>
          <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', margin: '6px 0 0 0', maxWidth: '600px', lineHeight: 1.5 }}>
            Manage website sections, editorial blogs, showcase case studies, and brand configurations in real-time.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <a
            href="/blog"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 255, 255, 0.08)',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              fontWeight: 600,
              fontSize: '13px',
              padding: '10px 18px',
              borderRadius: '9999px',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              backdropFilter: 'blur(10px)',
            }}
          >
            <span>📰 View Blogs</span>
            <span style={{ fontSize: '13px', opacity: 0.7 }}>↗</span>
          </a>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#FFFFFF',
              color: '#000000',
              fontWeight: 600,
              fontSize: '13px',
              padding: '10px 20px',
              borderRadius: '9999px',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 16px rgba(234, 88, 12, 0.25)',
            }}
          >
            <span>🚀 View Live Site</span>
            <span style={{ fontSize: '14px' }}>↗</span>
          </a>
        </div>
      </div>

      {/* Collections Section */}
      <div style={{ marginTop: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#FB923C', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            Dynamic Content Collections
          </span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.06)' }} />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '14px',
          }}
        >
          {collectionLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              style={{
                background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
                border: '1px solid rgba(234, 88, 12, 0.2)',
                borderRadius: '14px',
                padding: '16px 18px',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                transition: 'all 0.2s ease',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '20px' }}>{item.icon}</span>
                  <span style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '14px' }}>{item.label}</span>
                </div>
                {item.badge && (
                  <span style={{ fontSize: '10px', fontWeight: 700, background: 'rgba(234, 88, 12, 0.25)', color: '#FF8A50', padding: '2px 7px', borderRadius: '9999px', border: '1px solid rgba(234, 88, 12, 0.4)' }}>
                    {item.badge}
                  </span>
                )}
              </div>
              <span style={{ color: 'rgba(255, 255, 255, 0.55)', fontSize: '12px', lineHeight: 1.4 }}>{item.desc}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Website Sections (Globals) */}
      <div style={{ marginTop: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255, 255, 255, 0.5)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            Website Global Sections & Customizer
          </span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.06)' }} />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
            gap: '12px',
          }}
        >
          {sectionLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              style={{
                background: 'rgba(255, 255, 255, 0.025)',
                border: '1px solid rgba(255, 255, 255, 0.07)',
                borderRadius: '12px',
                padding: '14px 16px',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '17px' }}>{item.icon}</span>
                <span style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '13px' }}>{item.label}</span>
              </div>
              <span style={{ color: 'rgba(255, 255, 255, 0.45)', fontSize: '11.5px', lineHeight: 1.3 }}>{item.desc}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
