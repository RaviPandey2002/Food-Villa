import { useState } from "react";
import * as Yup from "yup";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    interests: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    let updatedInterests = [...formData.interests];
    if (checked) {
      updatedInterests.push(name);
    } else {
      updatedInterests = updatedInterests.filter(
        (interest) => interest !== name
      );
    }
    setFormData({ ...formData, interests: updatedInterests });
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("The feild is required feild")
      .min(3, "The first name should be more than 2 characters long")
      .max(14,"The first name should be less than 14 characters long"),
    
      lastName: Yup.string()
      .required("The feild is required feild")
      .min(3, "The first name should be more than 2 characters long")
      .max(14,"The first name should be less than 14 characters long")
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false})
      console.log("Validated successfully")
      
    } catch (err) {
      console.log(err.name)
    }

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      interests: [],
    });

  };

  return (
    <div id="form">
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label>First Name: </label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          ></input>
        </div>

        <div>
          <label>Last Name: </label>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          ></input>
        </div>

        <div>
          <label>Email: </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          ></input>
        </div>

        <div>
          <label>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            required
            onChange={handleChange}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label>Interests: </label>
          <label>
            <input
              type="checkbox"
              name="coding"
              values={formData.interests.includes("coding")}
              onChange={handleCheckboxChange}
            ></input>
            Coding
          </label>
          <label>
            <input
              type="checkbox"
              name="sports"
              values={formData.interests.includes("sports")}
              onChange={handleCheckboxChange}
            ></input>
            Sports
          </label>
          <label>
            <input
              type="checkbox"
              name="reading"
              values={formData.interests.includes("reading")}
              onChange={handleCheckboxChange}
            ></input>
            Reading
          </label>
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
