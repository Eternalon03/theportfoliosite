import Divider from "./components/divider"
import AboutMe from "./components/home/about-me"
import Education from "./components/home/skills"
import Experience from "./components/home/experience"
import HeroSection from "./components/home/hero-section"

const page = () => {
  return (
    <main>
      <HeroSection/>
      <Divider/>
      <AboutMe/>
      <Divider/>
      <Education/>
      <Divider/>
      <Experience/>
      <Divider/>
    </main>
  )
}

export default page