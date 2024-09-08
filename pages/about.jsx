import React from 'react';
import Link from 'next/link';

export default function About() {
  return (
    <>
      <div className="container mx-auto py-10 px-5">
        <h1 className="text-4xl font-bold mb-6">About TuneTify</h1>
        <p className="mb-4 text-lg">
          Welcome to TuneTify, where innovation meets your musical passions. Our mission is to transform your listening experience by offering a platform that seamlessly integrates the latest hits with timeless classics. At TuneTify, we are dedicated to providing you with a personalized and dynamic musical journey.
        </p>
        <p className="mb-4 text-lg">
          TuneTify brings you closer to the music you love with an extensive library of tracks, expertly curated playlists, and exclusive artist features. Whether you re diving into new genres or enjoying your favorite songs, our platform is designed to keep your music experience fresh and engaging.
        </p>
        <p className="mb-4 text-lg">
          Our user-friendly interface allows you to create and share playlists, follow your favorite artists, and connect with a community of music lovers. TuneTify makes it easy to discover and enjoy music on your terms.
        </p>
        <p className="mb-4 text-lg">
          Founded by music enthusiasts for music enthusiasts, TuneTify is committed to supporting emerging artists and fostering a space where creativity thrives. We strive to offer a vibrant platform that highlights both established and up-and-coming talents.
        </p>
        <p className="mb-4 text-lg">
          Join TuneTify today and experience a new era of musical discovery. With us, you’ll always be tuned into the future of music.
        </p>
        <Link href="/discover" className="text-primary hover:underline">
          Back to Home
        </Link>
      </div>
    </>
  );
}
