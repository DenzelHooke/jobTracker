import Header from '../components/index/Header';
import Image from 'next/image';

export default function Index() {
  return (
    <>
      <Header />
      <section className="mission">
        <div className="max-container">
          <h2 className="title">
            For the <span>people</span>, by the <span>people</span>
          </h2>
          <div className="utility">
            <div className="container">
              <p className="prelude">THE GOAL</p>
              <p className="text-body">
                Our mission is to provide a comprehensive and user-friendly
                platform for job seekers to keep track of their job
                applications. We believe that the job search process can be
                overwhelming, especially when applying to multiple companies at
                once. Our website is designed to help individuals stay organized
                and on top of their job search by providing a centralized
                location to store and manage their applications. We strive to
                offer a seamless and intuitive user experience that empowers job
                seekers to take control of their job search and achieve their
                career goals.
              </p>
            </div>
            <div className="image-container">
              <Image
                src="https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg"
                width={600}
                height={800}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
