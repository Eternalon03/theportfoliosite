import Divider from "./components/divider"
import AboutMe from "./components/home/about-me"
import Education from "./components/home/skills"
import Experience from "./components/home/experience"
import HeroSection from "./components/home/hero-section"
import ThreeScene from "./components/three-scene"


const page = () => {
  return (
    <main>
      <ThreeScene/>
      <section id="hero">
        <HeroSection/>
      </section>
      <Divider/>
      <section id="about">
        <AboutMe/>
      </section>
      <Divider/>
      <section id="skills">
        <Education/>
      </section>
      <Divider/>
      <section id="experience">
        <Experience/>
      </section>
      <Divider/>
    </main>
  )
}

export default page