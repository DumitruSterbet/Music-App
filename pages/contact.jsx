import React from 'react';
import Link from 'next/link';

export default function Contact() {
  return (
    <>
      <div className="container mx-auto py-10 px-5">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        <p className="mb-4 text-lg">
          We’d love to hear from you! If you have any questions, feedback, or inquiries, feel free to reach out to us. Our team is here to assist you and ensure that your experience with TuneTify is exceptional.
        </p>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <p className="text-lg mb-2">
            <strong>Email:</strong> <a href="mailto:support@tunetify.com" className="text-primary hover:underline">support@tunetify.com</a>
          </p>
          <p className="text-lg mb-2">
            <strong>Phone:</strong> <a href="tel:+1234567890" className="text-primary hover:underline">+1 (234) 567-890</a>
          </p>
          <p className="text-lg mb-2">
            <strong>Address:</strong> 123 Music Lane, Suite 100, Music City, CA 90001
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
          <form
            action="/api/contact"
            method="POST"
            className="space-y-4"
          >
            <div>
              <label htmlFor="name" className="block text-lg font-medium mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg font-medium mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-lg font-medium mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                required
                className="w-full p-2 border border-gray-300 rounded"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark"
            >
              Send Message
            </button>
          </form>
        </div>
        <div className="mt-6">
          <Link href="/discover" className="text-primary hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}
