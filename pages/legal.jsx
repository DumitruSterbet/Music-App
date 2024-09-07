import React from 'react';
import Link from 'next/link';

export default function Legal() {
  return (
    <>
      <div className="container mx-auto py-10 px-5">
        <h1 className="text-4xl font-bold mb-6">Legal Information</h1>
        
        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">Terms of Service</h2>
          <p className="mb-4 text-lg">
            Welcome to TuneTify. By using our services, you agree to the following terms and conditions. Please read them carefully before using our platform.
          </p>
          <p className="mb-4 text-lg">
            <strong>1. Acceptance of Terms:</strong> By accessing or using TuneTify, you agree to be bound by these Terms of Service and our Privacy Policy.
          </p>
          <p className="mb-4 text-lg">
            <strong>2. Use of Service:</strong> You agree to use TuneTify for lawful purposes only and in a manner that does not infringe on the rights of others.
          </p>
          <p className="mb-4 text-lg">
            <strong>3. User Responsibilities:</strong> You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account.
          </p>
          <p className="mb-4 text-lg">
            <strong>4. Termination:</strong> We reserve the right to terminate or suspend your access to TuneTify at our sole discretion, without notice, for any reason.
          </p>
          <p className="mb-4 text-lg">
            <strong>5. Changes to Terms:</strong> We may update these terms from time to time. Your continued use of TuneTify constitutes acceptance of any changes.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">Privacy Policy</h2>
          <p className="mb-4 text-lg">
            TuneTify values your privacy. This Privacy Policy outlines how we collect, use, and protect your personal information.
          </p>
          <p className="mb-4 text-lg">
            <strong>1. Information Collection:</strong> We collect information you provide directly, such as your name and email address, as well as information about your use of our services.
          </p>
          <p className="mb-4 text-lg">
            <strong>2. Use of Information:</strong> We use your information to provide and improve our services, communicate with you, and for other legitimate business purposes.
          </p>
          <p className="mb-4 text-lg">
            <strong>3. Data Protection:</strong> We implement reasonable security measures to protect your personal information from unauthorized access, use, or disclosure.
          </p>
          <p className="mb-4 text-lg">
            <strong>4. Third-Party Services:</strong> Our services may contain links to third-party websites. We are not responsible for the privacy practices of such third parties.
          </p>
          <p className="mb-4 text-lg">
            <strong>5. Changes to Privacy Policy:</strong> We may update this Privacy Policy from time to time. Any changes will be posted on this page.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">Disclaimer</h2>
          <p className="mb-4 text-lg">
            The information provided by TuneTify is for general informational purposes only. We make no warranties about the completeness, reliability, or accuracy of the information.
          </p>
          <p className="mb-4 text-lg">
            <strong>1. No Guarantees:</strong> We do not guarantee that the content or services will meet your expectations or be available without interruption.
          </p>
          <p className="mb-4 text-lg">
            <strong>2. Limitation of Liability:</strong> We are not liable for any damages resulting from the use of or inability to use our services.
          </p>
          <p className="mb-4 text-lg">
            <strong>3. External Links:</strong> We are not responsible for the content of external websites linked to TuneTify.
          </p>
        </section>

        <Link href="/discover" className="text-primary hover:underline">
          Back to Home
        </Link>
      </div>
    </>
  );
}
