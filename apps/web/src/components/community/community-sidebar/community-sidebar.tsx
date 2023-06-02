import React from 'react';
import styles from './community-sidebar.module.scss';
import CommunitySidebarItem from './community-sidebar-item/community-sidebar-item';

function CommunitySidebar() {
  return (
    <div className={styles.communitySidebar}>
      <CommunitySidebarItem />
    </div>
  )
}

export default CommunitySidebar
