import React from 'react';
import AboutImage from '../../assets/images/about1.jpg';
import AdditionalImage from '../../assets/images/about2.jpg'; // Add path to the new image

function About() {
  return (
    <>
      <section className="about-section py-8">
      <h2 className="text-3xl font-bold flex justify-center mb-3">About Us</h2>
      <p className='mb-4 p-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, animi voluptatem. Doloribus, laborum voluptatem autem, ducimus illo consectetur eveniet exercitationem tenetur veritatis cum mollitia odit impedit, laudantium quas earum voluptatum! Quasi tempore nam reprehenderit ut cumque delectus odit fugiat, cum laboriosam itaque iure dolore. Officia atque quasi totam dolor quibusdam.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, libero. Rem dolores eum harum minima, repudiandae possimus eveniet neque natus quis voluptates sed at ipsa culpa error, praesentium explicabo animi necessitatibus numquam odio laboriosam magni nam tempore incidunt maiores! Voluptas earum sapiente eum perferendis, tempora recusandae magni quis facilis possimus.</p>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="content-column w-full lg:w-1/2">
              <div className="inner-column">
                <div className="sec-title mb-4">
                </div>
                <div className="text mb-4">
                  Sky Tour has a database of all flights and airlines in the world with its user-friendly interface that makes it easy to search and make a flight booking. Earn Sky Tour money on every flight booking. Redeem Sky Tour money on future bookings to get cheaper flight tickets.
                </div>
                <div className="text mb-4">
                  <strong>Cheap Flight Ticket</strong>
                  Cheap flights are available at Sky Tour for both domestic and international destinations. Sky Tour aggregates and compares real-time and future date travel information, prices, and availability for flights to provide you with the cheapest flight tickets, flight deals, offers & discounts. Easily find cheaper flight tickets/air tickets compared to other websites. Sky Tour offers multiple bank, airline, and other partner deals which give you an instant discount on flight tickets or air tickets. On Sky Tour, you can save up to 40% on air ticket booking online with our fare alert feature on domestic and international flights. See all Flight Booking Offers.
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate earum voluptatem dolor nam rerum numquam dolorum rem blanditiis deserunt modi.
                </div>
              </div>
            </div>

            <div className="image-column w-full lg:w-1/2 mb-4 lg:mb-0 gap-4">
              <div className="inner-column">
                <img title="Subhajit Bhukta" src={AdditionalImage} alt="About Us" className="w-96 mx-auto rounded-lg shadow-lg mb-4" />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-between items-center mt-8">
            <div className="image-column w-full lg:w-1/2 mb-4 lg:mb-0 gap-4">
              <div className="inner-column">
                <img title="Additional Image" src={AboutImage} alt="Additional" className="w-96 mx-auto rounded-lg shadow-lg" />
              </div>
            </div>
            <div className="content-column w-full lg:w-1/2">
              <div className="inner-column">
                <div className="sec-title my-4">
                  <h2 className="text-3xl font-bold">Easy and Convenient</h2>
                </div>
                <div className="text mb-4">
                  You can book international flights on Sky Tour in three easy steps: Download the Sky Tour app on your mobile phone. Enter your air travel details i.e., date of journey, destinations, and travel class you wish to avail, and then choose a suitable flight from the list available.
                </div>
                <div className="text mb-4">
                  You can also use Sky Tour to compare flight prices and book cheap air tickets. Book flights of top domestic airlines like: Air India, Vistara, Indigo Airlines, SpiceJet, AirAsia, Go First Flights, Air-India Express and enjoy a hassle-free trip experience.
                </div>
                <div className="text mb-4">
                  Sky Tour is a leading domestic and international flight booking platform in India, providing flight bookings at low prices. Sky Tour offers a wide range of flight options from different airlines, so you can be sure to find a cheap flight that best suits your travel needs.
                </div>
                <div className="text mb-4">
                  After we receive your reservation, we will send you an immediate e-mail confirmation as well as the online invoice, which will help you to understand the offer benefits availed on the purchase. This e-mail will include your itinerary details and ticket price. You may also confirm your reservation online by accessing the 'Sky Tour' section on the app.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
