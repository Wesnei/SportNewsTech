import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import Hero from "../../components/hero";
import Feed from "../../components/feed/index";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <div className="max-w-screen-xl mx-auto p-4 lg:p-8">
          <Feed />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default HomePage;