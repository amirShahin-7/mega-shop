import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | MegaShop",
  description: "MegaShop Privacy Policy and Data Handling.",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

      <div className="prose prose-sky max-w-none space-y-8 text-gray-600">
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            1. Information We Collect
          </h2>
          <p>
            We collect information you provide directly to us, such as when you
            create an account, place an order, or contact us for support. This
            may include your name, email address, phone number, and shipping
            address.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            2. How We Use Your Information
          </h2>
          <p>
            We use the information we collect to process your transactions,
            provide customer support, and improve our services. We may also send
            you promotional messages, but you can opt out at any time.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            3. Data Security
          </h2>
          <p>
            We implement a variety of security measures to maintain the safety
            of your personal information. Your sensitive data is encrypted and
            stored securely.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Cookies</h2>
          <p>
            We use cookies to enhance your experience on our site, understand
            how you use our services, and personalize content and advertising.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            5. Third-Party Services
          </h2>
          <p>
            We may use third-party services (like payment processors) to
            facilitate our business operations. These services have their own
            privacy policies.
          </p>
        </section>
      </div>

      <div className="mt-12 p-6 bg-sky-50 rounded-xl border border-sky-100 italic text-sky-700">
        Last updated: February 11, 2024. If you have any questions, please
        contact us at support@megashop.com.
      </div>
    </div>
  );
}
