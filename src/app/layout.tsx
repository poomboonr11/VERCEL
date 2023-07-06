// app/layout.tsx
'use client'

import { Chakra } from './components/provider'
import { Nav } from './components/Nav'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {

  return (
    <html>
      <Chakra>
          <body>
            <Nav></Nav>
              {children}
          </body>
      </Chakra>
    </html>
  );
}