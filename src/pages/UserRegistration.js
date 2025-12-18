import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserRegister.css";
import { useNavigate } from "react-router-dom";

const UserRegistration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerNumber: "",
    customerParentNumber: "",
    customerGender: "",
    customerAge: "",
    customerCurrentAddress: "",
    customerPermanentAddress: "",
    customerWorkLocation: "",
    customerWorkOrg: "",
    customerInterestedIn: "",
    password: "",
    bloodGroup: "",
    country: "India", // only India will be shown
    state: "",
    city: "",
    dateOfBirth: "",
  });

  const [message, setMessage] = useState("");

  /* ---------- Data ---------- */
  const indianStates = [
    "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
    "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka",
    "Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram",
    "Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
    "Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
    "Andaman and Nicobar Islands","Chandigarh","Dadra and Nagar Haveli and Daman and Diu",
    "Delhi","Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry"
  ];

  const citiesByState = {
    "Maharashtra": ["Mumbai","Pune","Nagpur","Nashik","Thane","Aurangabad","Solapur","Kolhapur","Amravati","Sangli","Latur","Jalgaon","Malegaon","Akola","Nanded"],
    "Karnataka": ["Bengaluru","Mysuru","Mangalore","Hubli","Belagavi","Dharwad","Kalaburagi"],
    "Tamil Nadu": ["Chennai","Coimbatore","Madurai","Tiruchirappalli","Salem","Tirunelveli"],
    "Uttar Pradesh": ["Lucknow","Kanpur","Varanasi","Noida","Agra","Meerut"],
    "West Bengal": ["Kolkata","Howrah","Asansol","Durgapur","Siliguri"],
    "Delhi": ["New Delhi","Dwarka","Rohini","Saket"],
    "Gujarat": ["Ahmedabad","Surat","Vadodara","Rajkot","Bhavnagar"],
    "Punjab": ["Ludhiana","Amritsar","Jalandhar","Patiala"],
    "Rajasthan": ["Jaipur","Jodhpur","Udaipur","Kota","Bikaner"],
    "Kerala": ["Thiruvananthapuram","Kochi","Kozhikode","Thrissur"],
    "Bihar": ["Patna","Gaya","Bhagalpur"],
    "Andhra Pradesh": ["Visakhapatnam","Vijayawada","Guntur"],
    "Telangana": ["Hyderabad","Warangal","Nizamabad"],
    "Odisha": ["Bhubaneswar","Cuttack","Rourkela"],
    // fallback
    "default": ["Other"]
  };

  /* ---------- City dropdown / search state ---------- */
  const [citySearch, setCitySearch] = useState("");
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

  /* ---------- Handlers ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = (e) => {
    // country dropdown has only India but keep handler for consistency
    setFormData(prev => ({ ...prev, country: e.target.value }));
  };

  const handleStateChange = (e) => {
    const stateVal = e.target.value;
    setFormData(prev => ({ ...prev, state: stateVal, city: "" }));
    setCitySearch("");
    setCityDropdownOpen(false);
  };

  const handleCitySelect = (city) => {
    setFormData(prev => ({ ...prev, city }));
    setCitySearch(city);
    setCityDropdownOpen(false);
  };

  const getFilteredCities = () => {
    const state = formData.state || "";
    const cities = citiesByState[state] || citiesByState["default"];
    const q = citySearch.trim().toLowerCase();
    if (!q) return cities;
    const exact = [];
    const prefix = [];
    const contains = [];
    for (const c of cities) {
      const lc = c.toLowerCase();
      if (lc === q) exact.push(c);
      else if (lc.startsWith(q)) prefix.push(c);
      else if (lc.includes(q)) contains.push(c);
    }
    return [...exact, ...prefix, ...contains];
  };

  useEffect(() => {
    const handler = (ev) => {
      if (!ev.target.closest || !ev.target.closest(".city-dropdown-wrapper")) {
        setCityDropdownOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  /* ---------- Submit ---------- */
 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(
      "http://localhost:2509/api/user/login/saveUserLogin",
      formData
    );

    alert(res.data.message || "User registered successfully!");
    navigate("/");
  } catch (err) {
    console.error(err);
    alert("Something went wrong. Please try again.");
  }
};

  /* ---------- JSX ---------- */
  return (
    <div className="registration-page">
      <div className="registration-container">
        <h2>🎶 Dhol Tasha Pathak Registration 🎶</h2>

        <form className="registration-form" onSubmit={handleSubmit}>

          {/* Left Column */}
          <div className="form-column">
            <input
              name="customerName"
              placeholder="Full Name"
              value={formData.customerName}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="customerEmail"
              placeholder="Email"
              value={formData.customerEmail}
              onChange={handleChange}
              required
            />

            <input
              name="customerNumber"
              placeholder="Mobile Number"
              value={formData.customerNumber}
              onChange={handleChange}
              required
            />

            <input
              name="customerParentNumber"
              placeholder="Parent Contact Number"
              value={formData.customerParentNumber}
              onChange={handleChange}
            />

            <select
              name="customerGender"
              value={formData.customerGender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              placeholder="Date of Birth"
              required
            />

            <input
              name="customerAge"
              type="number"
              placeholder="Age"
              value={formData.customerAge}
              onChange={handleChange}
            />

            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          {/* Right Column */}
          <div className="form-column">
            <input
              name="customerCurrentAddress"
              placeholder="Current Address"
              value={formData.customerCurrentAddress}
              onChange={handleChange}
              required
            />

            <input
              name="customerPermanentAddress"
              placeholder="Permanent Address"
              value={formData.customerPermanentAddress}
              onChange={handleChange}
            />

            <input
              name="customerWorkLocation"
              placeholder="Work Location"
              value={formData.customerWorkLocation}
              onChange={handleChange}
            />

            <input
              name="customerWorkOrg"
              placeholder="Organization Name"
              value={formData.customerWorkOrg}
              onChange={handleChange}
            />

            <input
              name="customerInterestedIn"
              placeholder="Interested In (e.g. Dhol, Tasha, Dhwaj, Lezim)"
              value={formData.customerInterestedIn}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            {/* Country dropdown - only India */}
            <select
              name="country"
              value={formData.country}
              onChange={handleCountryChange}
              required
            >
              <option value="India">India</option>
            </select>

            {/* State dropdown */}
            <select
              name="state"
              value={formData.state}
              onChange={handleStateChange}
              required
            >
              <option value="">Select State / UT</option>
              {indianStates.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>

            {/* City: searchable dropdown */}
            <div className="city-dropdown-wrapper" style={{ position: "relative" }}>
              <input
                name="citySearch"
                value={citySearch}
                onChange={(e) => {
                  setCitySearch(e.target.value);
                  setCityDropdownOpen(true);
                }}
                onFocus={() => setCityDropdownOpen(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const first = getFilteredCities()[0];
                    if (first) handleCitySelect(first);
                  }
                }}
                placeholder={formData.state ? "Search / Select city" : "Select state first"}
                disabled={!formData.state}
                autoComplete="off"
                required
              />

              {cityDropdownOpen && formData.state && (
                <ul
                  className="city-suggestions"
                  style={{
                    listStyle: "none",
                    margin: 0,
                    padding: "6px 0",
                    position: "absolute",
                    left: 0,
                    right: 0,
                    maxHeight: 160,
                    overflowY: "auto",
                    border: "1px solid #ddd",
                    background: "#fff",
                    zIndex: 50,
                  }}
                >
                  {getFilteredCities().length === 0 && (
                    <li style={{ padding: "6px 12px" }}>No cities found</li>
                  )}
                  {getFilteredCities().map((c) => (
                    <li
                      key={c}
                      onClick={() => handleCitySelect(c)}
                      style={{ padding: "6px 12px", cursor: "pointer" }}
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Register Button Below All Fields */}
          <div className="bottom-button-container">
            <button type="submit" className="submit-btn">
              Register
            </button>
          </div>
        </form>

        {message && <p className="response-message">{message}</p>}
      </div>
    </div>
  );
};

export default UserRegistration;
