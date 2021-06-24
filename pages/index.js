import Root from "../components/Root/Root";
import About from '../components/Root/About'
import UnderConstruction from '../components/Root/UnderConstruction/UnderConstruction'

export default function Home() {
  return <Root>
    <About />
    <UnderConstruction />
  </Root>;
}
