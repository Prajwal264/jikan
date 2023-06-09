import CommunitySidebar from '@/components/community/community-sidebar/community-sidebar'
import React, { PropsWithChildren } from 'react'
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
