import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactInfo() {
  const contactDetails = [
    {
      icon: Mail,
      title: "Email Us",
      value: "amirshahin.1.512@gmail.com",
      link: "mailto:amirshahin.1.512@gmail.com",
    },
    {
      icon: Phone,
      title: "Call Us",
      value: "+20 110 044 5395",
      link: "tel:+201100445395",
    },
    {
      icon: MapPin,
      title: "Office",
      value: "Tech City, Cairo, Egypt",
      link: null,
    },
  ];

  return (
    <div className="lg:col-span-1 space-y-6">
      {contactDetails.map((detail, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 transform hover:translate-y-[-4px] transition-transform"
        >
          <div className="bg-sky-100 p-3 rounded-xl text-sky-600">
            <detail.icon size={24} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">{detail.title}</h3>
            {detail.link ? (
              <a
                href={detail.link}
                className="text-gray-500 text-sm mt-1 underline hover:text-sky-600 transition-colors"
              >
                {detail.value}
              </a>
            ) : (
              <p className="text-gray-500 text-sm mt-1">{detail.value}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
