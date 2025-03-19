export default function ProfileForm({ formData, onChange }) {
    return (
      <form className="grid grid-cols-2 gap-6">
        {[
          { label: "Email Address", id: "email", type: "email" },
          { label: "Date of Birth", id: "dateOfBirth", type: "date" },
          { label: "Phone Number", id: "phone", type: "text" },
          { label: "Address 1", id: "address1", type: "text" },
          { label: "Address 2", id: "address2", type: "text" },
          { label: "Country", id: "country", type: "text" },
          { label: "State", id: "state", type: "text" },
        ].map(({ label, id, type }) => (
          <div key={id}>
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <input id={id} type={type} className="w-full p-3 rounded-lg border" value={formData[id]} onChange={onChange} />
          </div>
        ))}
      </form>
    );
  }
  