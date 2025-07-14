import Image from "next/image";
import Navbar from "@/component/layout/Navbar";
import Footer from "@/component/layout/Footer";
import ContactForm from "@/component/ContactForm";

export default function AboutPage() {
  return (
    <div className="bg-black">
      <Navbar />
      <main className="bg-black text-white font-sans">
        {/* Hero Section */}
        {/* Hero Banner */}
        <div className="relative overflow-hidden">
          <div className="relative w-full h-[40vh] overflow-hidden">
            <Image
              src="/sunset.jpg"
              alt="City skyline at sunset"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-black/70 z-10 flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-4xl sm:text-5xl font-bold mb-2 ">
              About us
            </h1>
            <p className="max-w-2xl text-gray-300 text-md w-full">
              Sartawi Properties is more than just a real
              estate brokerage; we are a team of Dubai
              natives with an intimate understanding of
              the city&rsquo;s dynamic real estate market.
              Founded by passionate and experienced
              professionals, our firm is built on a strong
              foundation of local knowledge and a
              commitment to delivering exceptional
              results.
            </p>
          </div>
        </div>

        {/* Who are we */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 px-10 items-center py-30">
          <div className="rounded overflow-hidden">
            <Image src="/hall.jpg" alt="Interior" width={600} height={400} className="rounded-md" />
          </div>
          <div className="h-full">
            <h1 className="text-4xl font-bold mb-4">Who are We?</h1>
            <p className="text-gray-300 text-md border-amber-500 max-w-xl">
              Our journey began with a shared vision to
              revolutionize Dubai&rsquo;s real estate industry. With
              over two decades of combined experience, our
              founders have witnessed the city&rsquo;s
              transformation firsthand and developed a
              unique understanding of its market dynamics.
              This expertise, combined with an extensive
              network of local connections, enables us to
              offer unparalleled real estate services to our
              clients.
              <br /><br />
              At Sartawi Properties, we are driven by a
              culture of integrity, transparency, and
              community involvement. We believe in building
              lasting relationships with our clients, providing
              personalized solutions tailored to meet their
              specific needs. Our team consists of highly
              qualified and experienced professionals who are
              deeply passionate about the industry and
              committed to excellence.
              <br /><br />
              With a profound understanding of the local
              market and a global perspective, we are well-
              equipped to navigate the complexities of
              Dubai&rsquo;s real estate landscape and deliver
              outstanding&nbsp;results.
            </p>
          </div>
        </section>

        {/* Achievements */}
        <section className="bg-[#111] py-12 text-center w-full h-80 ">
          <h2 className="text-3xl font-bold mb-8">What have we Achieved</h2>
          <div className="flex flex-wrap justify-around gap-12 px-10 text-white">
            <div>
              <p className="text-sm">Total Properties</p>
              <p className="text-3xl font-bold">1000+</p>
            </div>
            <div>
              <p className="text-sm">Properties Sold</p>
              <p className="text-3xl font-bold">100+</p>
            </div>
            <div>
              <p className="text-sm">Total Clients</p>
              <p className="text-3xl font-bold">60+</p>
            </div>
            <div>
              <p className="text-sm">Total Locations</p>
              <p className="text-3xl font-bold">25+</p>
            </div>
          </div>
        </section>
{/* <section className="py-20 px-6 max-w-5xl mx-auto">
  <h2 className="text-4xl font-normal text-center mb-12">Our Founding Team</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-items-center">
    {[
      { name: 'Mohannad', img: '/brokers/team.jpg' },
      { name: 'Mohammed ', img: '/brokers/team2.jpg' },
    ].map((agent, idx) => (
      <div key={idx} className="text-center max-w-xs w-full">
        <div className="relative w-full h-72 rounded-lg mb-4 overflow-hidden shadow-lg">
          <Image
            src={agent.img}
            alt={agent.name}
            fill
            className="object-cover"
          />
        </div>
        <p className="font-medium text-lg">{agent.name}</p>
      </div>
    ))}
  </div>
</section> */}

<section className="py-20 px-6 max-w-5xl mx-auto">
  <h2 className="text-4xl font-bold text-center mb-12">Our Founding Team</h2>
  <div className="space-y-16">
    {[
      {
        name: 'Mohannad Younis',
        img: '/brokers/team.jpg',
        quote: `Our passion for real estate fuels our dedication to pushing boundaries and creating innovative solutions. By leveraging our advanced platform, we're committed to shaping Dubai's future and demonstrating that with the right values and work ethic, anything is achievable. Together, let's make this decade even more remarkable than the last.`,
      },
      {
        name: 'Mohammed Younis',
        img: '/brokers/team2.jpg',
        quote: `Dubai's remarkable success story is a testament to its exceptional infrastructure and top-tier living standards. As a leader in real estate, Sartawi Properties is committed to driving this growth even further. With our advanced platform, we're poised to attract more residents and foreign investment, building on Dubai's reputation as a global city.`,
      },
    ].map((agent, idx) => (
      <div
        key={idx}
        className={`flex flex-col md:flex-row ${
          idx % 2 === 0 ? 'md:flex-row-reverse' : ''
        } items-center gap-8`}
      >
        <div className="relative w-full md:w-1/2 h-72 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={agent.img}
            alt={agent.name}
            fill
            className="object-contain "
          />
        </div>
        <div className="w-full md:w-1/2 text-left space-y-4">
          <blockquote className="text-lg text-gray-300 leading-relaxed">{agent.quote}</blockquote>
          <blockquote className="font-semibold text-xl text-white"> {agent.name}</blockquote>
        </div>
      </div>
    ))}
  </div>
</section>


        {/* Contact Section */}
        <section
          id="contact-section"
          className="relative h-[90vh] bg-cover bg-center text-white"
          style={{ backgroundImage: "url(/ship.jpg)" }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/70 z-0" />

          {/* Centered Contact Form */}
          {/* <div className="relative z-10 flex items-center justify-center h-full px-4">
            <div className="bg-opacity-80 p-8 rounded-md w-full max-w-xl">
              <h2 className="text-center text-3xl mb-6">Contact Us</h2>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter Full Name"
                  className="w-full bg-[#262626] rounded px-4 py-2 text-sm text-[#606060]"
                />
                <select className="w-full bg-[#262626] rounded px-4 py-2 text-sm text-[#606060]">
                  <option>What are you Looking for</option>
                  <option>Buy</option>
                  <option>Rent</option>
                </select>
                <select className="w-full bg-[#262626] rounded px-4 py-2 text-sm text-[#606060]">
                  <option>Which Area are you Looking for</option>
                  <option>Palm Jumeriah</option>
                  <option>Arabian Ranches</option>
                  <option>Business Bay</option>
                  <option>Al Barsha</option>
                  <option>Al Barari</option>
                  <option>Dubai Marina</option>
                  <option>Jumeirah Village Circle (JVC)</option>
                  <option>Al Furjan</option>
                  <option>Downtown Dubai</option>
                  <option>Al Maktoum International Airport</option>
                  <option>Emaar South</option>
                  <option>Al Jaddaf</option>
                  <option>Deira</option>
                  <option>Al Wasl</option>
                  <option>Bluewaters Island</option>

                </select>
                <textarea
                  placeholder="Any Other Comments"
                  className="w-full bg-[#262626] text-[#606060] border border-[#262626] h-22 rounded px-4 py-2 text-sm"
                />
                <button
                  type="submit"
                  className="w-full bg-white text-black py-2 rounded font-semibold"
                >
                  Submit
                </button>
              </form>
            </div>
          </div> */}
          <div className="relative z-10 flex items-center justify-center h-full px-4">
        <ContactForm />

</div>

        </section>
      </main>
      <Footer />
    </div>
  );
}
