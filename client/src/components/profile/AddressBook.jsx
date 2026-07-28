import { motion } from "framer-motion";

const AddressBook = () => {
  const addresses = [
    { id: 1, label: "Home", text: "123, Main Street, Almora, Uttarakhand" },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {addresses.map((addr) => (
        <motion.div key={addr.id} className="bg-white p-6 rounded-3xl shadow-lg">
          <h3 className="font-bold text-[#7B1E2B] mb-2">{addr.label}</h3>
          <p className="text-gray-600 mb-4">{addr.text}</p>
          <div className="flex gap-2">
            <button className="text-sm text-[#7B1E2B] hover:underline">Edit</button>
            <button className="text-sm text-red-600 hover:underline">Delete</button>
          </div>
        </motion.div>
      ))}
      <button className="border-2 border-dashed border-[#7B1E2B]/30 rounded-3xl p-6 text-[#7B1E2B] hover:border-[#7B1E2B]">
        + Add New Address
      </button>
    </div>
  );
};

export default AddressBook;
