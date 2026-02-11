import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | MegaShop",
  description: "MegaShop Terms and Conditions of use.",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Terms & Conditions
      </h1>

      <div className="prose prose-sky max-w-none space-y-8 text-gray-600">
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing and using MegaShop, you agree to be bound by these
            terms and conditions. If you do not agree, please do not use our
            services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            2. User Accounts
          </h2>
          <p>
            You are responsible for maintaining the confidentiality of your
            account and password. You agree to accept responsibility for all
            activities that occur under your account.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            3. Intellectual Property
          </h2>
          <p>
            All content on MegaShop, including text, graphics, logos, and
            images, is the property of MegaShop and protected by international
            copyright laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            4. Limitation of Liability
          </h2>
          <p>
            MegaShop shall not be liable for any direct, indirect, incidental,
            or consequential damages resulting from the use or inability to use
            our services.
          </p>
        </section>
      </div>

      <div className="mt-12 p-6 bg-gray-50 rounded-xl border border-gray-100 text-sm text-gray-500">
        MegaShop reserves the right to update these terms at any time. Your
        continued use of the site constitutes acceptance of the new terms.
      </div>
    </div>
  );
}
