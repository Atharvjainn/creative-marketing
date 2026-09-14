import React from 'react';

export default function DashboardBanner() {
  const quickLinks = [
    { label: 'Hero Section', href: '/admin/globals/hero', icon: '🚀', desc: 'Heading, avatars & badges' },
    { label: 'Solutions', href: '/admin/globals/solutions', icon: '💡', desc: 'Mockup & description' },
    { label: 'Features', href: '/admin/globals/features', icon: '⚡', desc: 'Feature cards & images' },
    { label: 'Key Features', href: '/admin/globals/key-features', icon: '🔑', desc: 'Alternating feature blocks' },
    { label: 'Benefits & Stats', href: '/admin/globals/benefits', icon: '📈', desc: 'Live count-up metrics' },
    { label: 'Pricing Plans', href: '/admin/globals/pricing', icon: '💳', desc: 'Tiers & popular ribbons' },
    { label: 'Testimonials', href: '/admin/globals/testimonials', icon: '⭐', desc: 'Client reviews & stars' },
    { label: 'CTA & Footer', href: '/admin/globals/cta', icon: '🌐', desc: 'Call to action & footer links' },
  ];

  return (
    <div style={{ marginBottom: '36px', marginTop: '12px' }}>
      {/* Welcome Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.15) 0%, rgba(20, 7, 2, 0.8) 100%)',
          border: '1px solid rgba(234, 88, 12, 0.3)',
          borderRadius: '16px',
          padding: '24px 28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#10B981',
                boxShadow: '0 0 10px #10B981',
                display: 'inline-block',
              }}
            />
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#FF8A50', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Creative Marketing Agency CMS
            </span>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#FFFFFF', margin: 0, letterSpacing: '-0.5px' }}>
            Control Center
          </h2>
          <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.65)', margin: '4px 0 0 0' }}>
            Manage website content, sections, and global configurations in real-time.
          </p>
        </div>

        <div>
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
              padding: '10px 18px',
              borderRadius: '9999px',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            }}
          >
            <span>View Live Site</span>
            <span style={{ fontSize: '15px' }}>↗</span>
          </a>
        </div>
      </div>

      {/* Quick Access Grid */}
      <div style={{ marginTop: '20px' }}>
        <p style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255, 255, 255, 0.45)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '12px' }}>
          Quick Section Shortcuts
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '12px',
          }}
        >
          {quickLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
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
                <span style={{ fontSize: '18px' }}>{item.icon}</span>
                <span style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '14px' }}>{item.label}</span>
              </div>
              <span style={{ color: 'rgba(255, 255, 255, 0.45)', fontSize: '12px' }}>{item.desc}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
