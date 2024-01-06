import './globals.css'
import { Poppins } from 'next/font/google'
export const metadata = {
  title: 'Nea Bill Calculator',
  description: 'Calculate the electricity bill',
}
import { SpeedInsights } from "@vercel/speed-insights/next"
const poppins = Poppins({
  weight: "400",
  subsets: ['latin']
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
