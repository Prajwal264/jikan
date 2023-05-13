import React, { PropsWithChildren } from 'react'
import CommunitySidebar from './community-sidebar/community-sidebar'
type Props = {
}
function CommunityLayout({ children }: PropsWithChildren<Props>) {
  return (
    <React.Fragment>
      <main className='flex'>
        <aside>
          <CommunitySidebar />
        </aside>
        {children}
      </main>
    </React.Fragment>
  )
}
export default CommunityLayout
