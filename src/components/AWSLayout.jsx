import {
  TopNavigation,
  SideNavigation,
  AppLayout,
  BreadcrumbGroup,
  Button
} from '@cloudscape-design/components';
import { useState } from 'react';

function AWSLayout({ children, breadcrumbs, activeHref, onBreadcrumbClick, onNavigate, tools, toolsOpen, onToolsChange }) {
  const [navigationOpen, setNavigationOpen] = useState(false);

  const handleNavigationClick = (event) => {
    event.preventDefault();
    if (onNavigate) {
      onNavigate(event.detail.href);
    }
  };

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
            onFollow={handleNavigationClick}
            header={{
              href: '#',
              text: 'OpenSearch Service'
            }}
            items={[
              {
                type: 'section',
                text: 'Serverless',
                items: [
                  { type: 'link', text: 'Collections', href: '#/collections' },
                  { type: 'link', text: 'Collection groups', href: '#/collection-groups' }
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
            padding: '8px 40px',
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #d5dbdb',
            marginLeft: '-20px',
            marginRight: '-20px',
            marginBottom: '20px',
            minWidth: 0
          }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <BreadcrumbGroup
                items={breadcrumbs}
                ariaLabel="Breadcrumbs"
                expandAriaLabel="Show path"
                onFollow={(event) => {
                  event.preventDefault();
                  if (onBreadcrumbClick) {
                    onBreadcrumbClick(event.detail.href);
                  }
                }}
              />
            </div>
          </div>
        }
        content={children}
        tools={tools}
        toolsOpen={toolsOpen}
        onToolsChange={onToolsChange}
        toolsHide={!tools}
        contentType="table"
        maxContentWidth={Number.MAX_VALUE}
      />
    </div>
  );
}

export default AWSLayout;
