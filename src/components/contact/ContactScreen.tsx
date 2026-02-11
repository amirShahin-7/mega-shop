import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";

export default function ContactScreen() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-linear-to-r from-sky-600 to-sky-700 py-16 text-center text-white px-4">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-sky-100 max-w-2xl mx-auto">
          Have a question or feedback? We'd love to hear from you. Fill out the
          form below and we'll get back to you as soon as possible.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-10">
        <div className="grid lg:grid-cols-3 gap-8">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
