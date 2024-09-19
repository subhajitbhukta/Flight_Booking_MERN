import React from 'react';

function Support() {
  return (
    <section className="support-section bg-gray-200 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Support</h2>
          <p className="text-lg text-gray-600">
            How can we assist you? Explore our support options or contact us directly.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row flex-wrap justify-between ">

{/* Contact Form */}
<div className="lg:w-2/4 w-full mx-auto  mb-8 md:mb-0 pl-4">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="text-3xl font-bold mb-6">Contact Form</h3>
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    placeholder="Your name"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Your email"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">
                    Subject
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="subject"
                    type="text"
                    placeholder="Subject"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="message"
                    rows="4"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="lg:w-2/6 w-full mx-auto lg:p-0 p-4 mb-8 md:mb-0 pr-4">
            <h3 className="text-3xl font-bold mb-6">Frequently Asked Questions</h3>
            <div className=" p-6 ">
              <details className="mb-4">
                <summary className="font-bold text-xl cursor-pointer">How do I book a flight?</summary>
                <p className="text-gray-600 mt-2">
                  You can book a flight by downloading our app and following the simple steps to enter your travel details and choose a flight.
                </p>
              </details>
              <details className="mb-4">
                <summary className="font-bold text-xl cursor-pointer">What payment methods do you accept?</summary>
                <p className="text-gray-600 mt-2">
                  We accept various payment methods including credit/debit cards, net banking, and popular digital wallets.
                </p>
              </details>
              <details className="mb-4">
                <summary className="font-bold text-xl cursor-pointer">How do I book a flight?</summary>
                <p className="text-gray-600 mt-2">
                  You can book a flight by downloading our app and following the simple steps to enter your travel details and choose a flight.
                </p>
              </details>
              <details className="mb-4">
                <summary className="font-bold text-xl cursor-pointer">Can I change my booking?</summary>
                <p className="text-gray-600 mt-2">
                  Yes, you can change your booking by visiting the 'My Bookings' section in our app and following the prompts to modify your reservation.
                </p>
              </details>
              <details className="mb-4">
                <summary className="font-bold text-xl cursor-pointer">Can I change my booking?</summary>
                <p className="text-gray-600 mt-2">
                  Yes, you can change your booking by visiting the 'My Bookings' section in our app and following the prompts to modify your reservation.
                </p>
              </details>
              <details className="mb-4">
                <summary className="font-bold text-xl cursor-pointer">How can I contact customer support?</summary>
                <p className="text-gray-600 mt-2">
                  You can contact our customer support through the 'Contact Us' section on our website or app. We are available 24/7 to assist you.
                </p>
              </details>
              <details className="mb-4">
                <summary className="font-bold text-xl cursor-pointer">Can I change my booking?</summary>
                <p className="text-gray-600 mt-2">
                  Yes, you can change your booking by visiting the 'My Bookings' section in our app and following the prompts to modify your reservation.
                </p>
              </details>
              <details className="mb-4">
                <summary className="font-bold text-xl cursor-pointer">What payment methods do you accept?</summary>
                <p className="text-gray-600 mt-2">
                  We accept various payment methods including credit/debit cards, net banking, and popular digital wallets.
                </p>
              </details>
              <details className="mb-4">
                <summary className="font-bold text-xl cursor-pointer">Can I change my booking?</summary>
                <p className="text-gray-600 mt-2">
                  Yes, you can change your booking by visiting the 'My Bookings' section in our app and following the prompts to modify your reservation.
                </p>
              </details>
            </div>
          </div>

          
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-600">
            For general inquiries or additional support, please email us at <a href="mailto:support@example.com" className="text-blue-500 hover:text-blue-700">support@example.com</a> or call us at <span className="text-blue-500">1-800-123-4567</span>.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Support;
