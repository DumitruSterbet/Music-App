import React from 'react';
import Link from 'next/link';

export default function Policy() {
  return (
    <>
      <div className="container mx-auto py-10 px-5">
        <h1 className="text-4xl font-bold mb-6">Policy Information</h1>
        
        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">Cookie Policy</h2>
          <p className="mb-4 text-lg">
            At TuneTify, we use cookies to enhance your experience on our platform. This Cookie Policy explains what cookies are, how we use them, and how you can manage them.
          </p>
          <p className="mb-4 text-lg">
            <strong>1. What Are Cookies:</strong> Cookies are small text files placed on your device that help us understand how you interact with our services.
          </p>
          <p className="mb-4 text-lg">
            <strong>2. How We Use Cookies:</strong> We use cookies to improve site functionality, analyze usage patterns, and personalize content and advertisements.
          </p>
          <p className="mb-4 text-lg">
            <strong>3. Managing Cookies:</strong> You can control or delete cookies through your browser settings. However, please note that disabling cookies may affect your experience on our platform.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">Refund Policy</h2>
          <p className="mb-4 text-lg">
            TuneTify offers a refund policy to ensure customer satisfaction. Please review our refund policy details below.
          </p>
          <p className="mb-4 text-lg">
            <strong>1. Eligibility:</strong> Refund requests must be made within 14 days of purchase. The product or service must be unused and in its original condition.
          </p>
          <p className="mb-4 text-lg">
            <strong>2. Process:</strong> To request a refund, please contact our support team with your order details. We will process your request and issue a refund if it meets our criteria.
          </p>
          <p className="mb-4 text-lg">
            <strong>3. Exclusions:</strong> Certain products or services may be non-refundable, including digital downloads and subscription fees.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">Content Policy</h2>
          <p className="mb-4 text-lg">
            Our Content Policy outlines the guidelines for content submission and interaction on TuneTify. Please adhere to the following rules.
          </p>
          <p className="mb-4 text-lg">
            <strong>1. Acceptable Content:</strong> Content submitted to TuneTify must be lawful, non-infringing, and not violate any third-party rights.
          </p>
          <p className="mb-4 text-lg">
            <strong>2. Prohibited Content:</strong> The following content is prohibited: hate speech, harassment, explicit material, and any content that promotes illegal activities.
          </p>
          <p className="mb-4 text-lg">
            <strong>3. Enforcement:</strong> We reserve the right to remove or modify content that violates our policies and may suspend or terminate user accounts for non-compliance.
          </p>
        </section>

        <Link href="/discover" className="text-primary hover:underline">
          Back to Home
        </Link>
      </div>
    </>
  );
}
