import {
  TopNavigation,
  SideNavigation,
  AppLayout,
  BreadcrumbGroup,
  Button
} from '@cloudscape-design/components';
import { useState } from 'react';

function AWSLayout({ children, breadcrumbs, activeHref, onBreadcrumbClick }) {
  const [navigationOpen, setNavigationOpen] = useState(false);

  return (
    <div>
      <div id="header">
        <TopNavigation
          identity={{
            href: '#',
            title: 'Amazon OpenSearch Service'
          }}
          utilities={[
            {
              type: 'button',
              text: 'Documentation',
              href: '#',
              external: true
            },
            {
              type: 'button',
              iconName: 'notification',
              ariaLabel: 'Notifications'
            },
            {
              type: 'menu-dropdown',
              text: 'US East (N. Virginia)',
              iconName: 'globe',
              items: [
                { id: 'us-east-1', text: 'US East (N. Virginia)' },
                { id: 'us-west-2', text: 'US West (Oregon)' }
              ]
            },
            {
              type: 'menu-dropdown',
              text: 'Admin',
              iconName: 'user-profile',
              items: [
                { id: 'profile', text: 'Profile' },
                { id: 'signout', text: 'Sign out' }
              ]
            }
          ]}
        />
      </div>

      <AppLayout
        headerSelector="#header"
        navigationOpen={navigationOpen}
        onNavigationChange={({ detail }) => setNavigationOpen(detail.open)}
        navigation={
          <SideNavigation
            activeHref={activeHref}
            header={{
              href: '#',
              text: 'OpenSearch Service'
            }}
            items={[
              { type: 'link', text: 'Dashboard', href: '#/dashboard' },
              {
                type: 'section',
                text: 'Serverless',
                items: [
                  { type: 'link', text: 'Collections', href: '#/collections' },
                  { type: 'link', text: 'Vector search collections', href: '#/vector-search' },
                  { type: 'link', text: 'Getting started', href: '#/getting-started' }
                ]
              },
              {
                type: 'section',
                text: 'Managed clusters',
                items: [
                  { type: 'link', text: 'Domains', href: '#/domains' },
                  { type: 'link', text: 'Packages', href: '#/packages' }
                ]
              },
              {
                type: 'section',
                text: 'Security',
                items: [
                  { type: 'link', text: 'Network policies', href: '#/network-policies' },
                  { type: 'link', text: 'Encryption policies', href: '#/encryption-policies' },
                  { type: 'link', text: 'Data access policies', href: '#/data-access-policies' }
                ]
              }
            ]}
          />
        }
        breadcrumbs={
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            padding: '12px 20px',
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #d5dbdb',
            marginLeft: '-20px',
            marginRight: '-20px',
            paddingLeft: '40px',
            paddingRight: '40px',
            marginBottom: '20px'
          }}>
            <BreadcrumbGroup
              items={breadcrumbs}
              ariaLabel="Breadcrumbs"
              onFollow={(event) => {
                event.preventDefault();
                if (onBreadcrumbClick) {
                  onBreadcrumbClick(event.detail.href);
                }
              }}
            />
            <div style={{ marginLeft: 'auto' }}>
              <Button iconName="status-info" variant="icon" />
            </div>
          </div>
        }
        content={children}
        toolsHide
        contentType="table"
        maxContentWidth={Number.MAX_VALUE}
      />
    </div>
  );
}

export default AWSLayout;
