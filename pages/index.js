import RootLayout from "../layouts/RootLayout";
import About from '../components/About/About'
import UnderConstruction from '../components/UnderConstruction/UnderConstruction'

export default function Home() {
  return <RootLayout>
    <About />
    <UnderConstruction />
  </RootLayout>;
}
